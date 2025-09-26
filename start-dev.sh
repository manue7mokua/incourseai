#!/bin/bash

# InCourse Development Environment Startup Script
# This script starts all required services for development

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if a port is in use
port_in_use() {
    lsof -i :$1 >/dev/null 2>&1
}

# Function to wait for a service to be ready
wait_for_service() {
    local url=$1
    local service_name=$2
    local max_attempts=30
    local attempt=1

    print_status "Waiting for $service_name to be ready..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s "$url" >/dev/null 2>&1; then
            print_success "$service_name is ready!"
            return 0
        fi
        
        echo -n "."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    print_error "$service_name failed to start after $((max_attempts * 2)) seconds"
    return 1
}

# Function to kill processes on specific ports
kill_port() {
    local port=$1
    if port_in_use $port; then
        print_warning "Port $port is in use, killing existing process..."
        lsof -ti:$port | xargs kill -9 2>/dev/null || true
        sleep 2
    fi
}

# Main startup function
main() {
    echo -e "${BLUE}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                    InCourse Dev Environment                 ║"
    echo "║                    Starting all services...                 ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    
    # Check if we're in the right directory
    if [ ! -f "package.json" ] || [ ! -d "backend" ] || [ ! -d "frontend" ]; then
        print_error "Please run this script from the project root directory"
        exit 1
    fi
    
    # Check required commands
    print_status "Checking required commands..."
    
    if ! command_exists docker; then
        print_error "Docker is not installed. Please install Docker Desktop."
        exit 1
    fi
    
    if ! command_exists node; then
        print_error "Node.js is not installed. Please install Node.js."
        exit 1
    fi
    
    if ! command_exists python3; then
        print_error "Python 3 is not installed. Please install Python 3."
        exit 1
    fi
    
    if ! command_exists supabase; then
        print_error "Supabase CLI is not installed. Please install it: https://supabase.com/docs/guides/cli"
        exit 1
    fi
    
    print_success "All required commands are available"
    
    # Start Docker Desktop if not running
    print_status "Starting Docker Desktop..."
    if ! docker info >/dev/null 2>&1; then
        print_warning "Docker is not running, starting Docker Desktop..."
        open -a Docker
        print_status "Waiting for Docker to start..."
        sleep 10
        
        # Wait for Docker to be ready
        local docker_attempts=0
        while ! docker info >/dev/null 2>&1 && [ $docker_attempts -lt 30 ]; do
            echo -n "."
            sleep 2
            docker_attempts=$((docker_attempts + 1))
        done
        
        if ! docker info >/dev/null 2>&1; then
            print_error "Docker failed to start. Please start Docker Desktop manually."
            exit 1
        fi
    fi
    print_success "Docker is running"
    
    # Start Supabase
    print_status "Starting Supabase local development environment..."
    cd supabase
    if ! supabase status >/dev/null 2>&1; then
        print_status "Starting Supabase services..."
        supabase start
    else
        print_success "Supabase is already running"
    fi
    cd ..
    
    # Kill existing processes on our ports
    print_status "Clearing ports 3000 and 8000..."
    kill_port 3000
    kill_port 8000
    
    # Start Backend
    print_status "Starting Backend (FastAPI)..."
    cd backend
    
    # Check if virtual environment exists, create if not
    if [ ! -d "venv" ]; then
        print_status "Creating Python virtual environment..."
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    source venv/bin/activate
    
    # Install dependencies
    print_status "Installing Python dependencies..."
    pip install -r requirements.txt >/dev/null 2>&1
    
    # Start backend in background
    print_status "Starting FastAPI backend on port 8000..."
    python3 main.py &
    BACKEND_PID=$!
    cd ..
    
    # Start Frontend
    print_status "Starting Frontend (Next.js)..."
    cd frontend
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        print_status "Installing Node.js dependencies..."
        npm install
    fi
    
    # Start frontend in background
    print_status "Starting Next.js frontend on port 3000..."
    npm run dev &
    FRONTEND_PID=$!
    cd ..
    
    # Wait for services to be ready
    print_status "Waiting for services to start..."
    
    # Wait for backend
    if wait_for_service "http://localhost:8000/health" "Backend API"; then
        print_success "Backend is ready at http://localhost:8000"
    else
        print_error "Backend failed to start"
        kill $BACKEND_PID 2>/dev/null || true
        exit 1
    fi
    
    # Wait for frontend
    if wait_for_service "http://localhost:3000" "Frontend"; then
        print_success "Frontend is ready at http://localhost:3000"
    else
        print_error "Frontend failed to start"
        kill $FRONTEND_PID 2>/dev/null || true
        exit 1
    fi
    
    # Test Canvas integration
    print_status "Testing Canvas integration..."
    if curl -s -X POST http://localhost:8000/api/lms/test-connection | grep -q "success"; then
        print_success "Canvas integration is working!"
    else
        print_warning "Canvas integration test failed (this is expected if Canvas credentials are not configured)"
    fi
    
    # Final status
    echo -e "\n${GREEN}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                    🎉 All Services Ready! 🎉                ║"
    echo "║                                                              ║"
    echo "║  Frontend:  http://localhost:3000                           ║"
    echo "║  Backend:   http://localhost:8000                           ║"
    echo "║  Supabase:  http://localhost:54321                          ║"
    echo "║                                                              ║"
    echo "║  API Docs:  http://localhost:8000/docs                      ║"
    echo "║  Courses:   http://localhost:3000/courses                   ║"
    echo "║                                                              ║"
    echo "║  Press Ctrl+C to stop all services                          ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    
    # Function to cleanup on exit
    cleanup() {
        echo -e "\n${YELLOW}Shutting down services...${NC}"
        kill $BACKEND_PID 2>/dev/null || true
        kill $FRONTEND_PID 2>/dev/null || true
        print_success "All services stopped"
        exit 0
    }
    
    # Set up signal handlers
    trap cleanup SIGINT SIGTERM
    
    # Keep script running
    print_status "Development environment is running. Press Ctrl+C to stop all services."
    wait
}

# Run main function
main "$@"
