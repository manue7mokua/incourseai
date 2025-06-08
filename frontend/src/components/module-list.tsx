'use client';

import { Module } from "@/lib/types/course";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ReadingTile } from "@/components/reading-tile";

interface ModuleListProps {
  modules: Module[];
  courseID: string;
}

export function ModuleList({ modules, courseID }: ModuleListProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const toggleModule = (moduleId: string | null) => {
    if (!moduleId) return;
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  return (
    <div className="space-y-4">
      {modules.map((module) => (
        <Card key={module.lmsId || module.id} className="overflow-hidden p-0">
          <CardContent className="p-0">
            <button
              onClick={() => toggleModule(module.lmsId)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                {expandedModules.has(module.lmsId || '') ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-500" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform duration-500" />
                )}
                <div className="text-left">
                  <h3 className="font-medium">{module.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {module.itemsCount} items
                  </p>
                </div>
              </div>
            </button>
            
            <div
              className={cn(
                "grid gap-2 border-t overflow-hidden transition-all duration-500 ease-in-out",
                expandedModules.has(module.lmsId || '') 
                  ? "max-h-[500px] opacity-100" 
                  : "max-h-0 opacity-0"
              )}
            >
              <div className="p-4 space-y-4">
                {module.moduleItems.map((item) => (
                  <ReadingTile 
                    key={item.lmsId || item.id}
                    reading={item}
                    courseID={courseID}
                    module={module}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 