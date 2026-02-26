'use client';

import { useEffect } from 'react';
import { logVisitor } from '@/utils/visitorFingerprint';

export function VisitorLogger() {
    useEffect(() => {
        console.log("🛑 ORACLE_DEBUG: VisitorLogger Mounted");
        console.log("🛑 ORACLE_DEBUG: Env Vars Check:", {
            url: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Existent" : "MISSING",
            key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Existent" : "MISSING"
        });
        logVisitor();
    }, []);

    return null;
}

