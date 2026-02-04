import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type ActivityType = 'search' | 'upload' | 'download' | 'translation' | 'system';

export interface Activity {
    id: string;
    type: ActivityType;
    action: string;
    timestamp: number;
    metadata?: any;
}

interface ActivityContextType {
    activities: Activity[];
    addActivity: (type: ActivityType, action: string, metadata?: any) => void;
    clearActivities: () => void;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const ActivityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activities, setActivities] = useState<Activity[]>(() => {
        // Load from localStorage on initial render
        const saved = localStorage.getItem('recentActivities');
        try {
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Failed to parse activities', e);
            return [];
        }
    });

    // Persist to localStorage whenever activities change
    useEffect(() => {
        localStorage.setItem('recentActivities', JSON.stringify(activities));
    }, [activities]);

    const addActivity = useCallback((type: ActivityType, action: string, metadata?: any) => {
        setActivities(prev => {
            // Prevent duplicate consecutive activities
            if (prev.length > 0) {
                const lastActivity = prev[0];
                if (lastActivity.type === type && lastActivity.action === action) {
                    // Update timestamp to now, but keep ID to minimize renders if lists use ID as key?
                    // No, if we want to show it "just happened", we should update timestamp.
                    // But returning a new object causes state change -> re-render.
                    // IMPORTANT: Since we use `useCallback` with `[]` dependency (functional state update), `addActivity` itself won't change.
                    // So `SearchPage` won't re-run effect.
                    // The re-render will happen, but `addActivity` prop won't change.
                    const updatedActivity = { ...lastActivity, timestamp: Date.now() };
                    return [updatedActivity, ...prev.slice(1)];
                }
            }

            const newActivity: Activity = {
                id: crypto.randomUUID(),
                type,
                action,
                timestamp: Date.now(),
                metadata
            };

            // Keep only last 20 activities
            const updated = [newActivity, ...prev].slice(0, 20);
            return updated;
        });
    }, []);

    const clearActivities = useCallback(() => {
        setActivities([]);
        localStorage.removeItem('recentActivities');
    }, []);

    return (
        <ActivityContext.Provider value={{ activities, addActivity, clearActivities }}>
            {children}
        </ActivityContext.Provider>
    );
};

export const useActivity = () => {
    const context = useContext(ActivityContext);
    if (context === undefined) {
        throw new Error('useActivity must be used within an ActivityProvider');
    }
    return context;
};
