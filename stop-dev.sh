#!/bin/bash

# InCourse Development Environment Stop Script
# This script stops all running development services

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to kill processes on specific ports
kill_port() {
    local port=$1
    local service_name=$2
    
    if lsof -i :$port >/dev/null 2>&1; then
        print_status "Stopping $service_name on port $port..."
        lsof -ti:$port | xargs kill -9 2>/dev/null || true
        print_success "$service_name stopped"
    else
        print_warning "$service_name was not running on port $port"
    fi
}

main() {
    echo -e "${BLUE}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                    InCourse Dev Environment                 ║"
    echo "║                    Stopping all services...                 ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    
    # Stop frontend (port 3000)
    kill_port 3000 "Frontend (Next.js)"
    
    # Stop backend (port 8000)
    kill_port 8000 "Backend (FastAPI)"
    
    # Stop Supabase
    print_status "Stopping Supabase local development environment..."
    cd supabase
    if supabase status >/dev/null 2>&1; then
        supabase stop
        print_success "Supabase stopped"
    else
        print_warning "Supabase was not running"
    fi
    cd ..
    
    # Kill any remaining Python processes related to our project
    print_status "Cleaning up any remaining Python processes..."
    pkill -f "python.*main.py" 2>/dev/null || true
    pkill -f "uvicorn" 2>/dev/null || true
    
    # Kill any remaining Node processes related to our project
    print_status "Cleaning up any remaining Node processes..."
    pkill -f "next dev" 2>/dev/null || true
    
    print_success "All development services have been stopped!"
}

main "$@"
