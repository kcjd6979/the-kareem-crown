import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { supabase } from './supabaseClient';

export interface VisitorInfo {
    visitorId: string;
    isNew: boolean;
}

export const initFingerprint = async (): Promise<string> => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
};

export const logVisitor = async (entryPoint: string = 'kareem-crown') => {
    try {
        const visitorId = await initFingerprint();

        // Check if visitor exists
        const { data: existing, error: fetchError } = await supabase
            .from('mtm_visitor_logs')
            .select('*')
            .eq('visitor_id', visitorId)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            console.error('Error fetching visitor:', fetchError);
            return;
        }

        if (existing) {
            // Update last seen
            await supabase
                .from('mtm_visitor_logs')
                .update({ last_seen: new Error().stack ? new Date().toISOString() : new Date().toISOString() })
                .eq('visitor_id', visitorId);
        } else {
            // Insert new visitor
            await supabase
                .from('mtm_visitor_logs')
                .insert([{
                    visitor_id: visitorId,
                    entry_point: entryPoint,
                    meta_context: {
                        userAgent: navigator.userAgent,
                        language: navigator.language,
                        platform: navigator.platform
                    }
                }]);
        }

        return visitorId;
    } catch (err: any) {
        console.error("🛑 ORACLE_ERROR:", err.message, err.details || err);
    }
};
