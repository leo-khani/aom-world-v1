import { supabase } from "@/client/supabase";
import { HotkeyData } from "./type";

export async function getHotkey(id?: number, ipAddress?: string): Promise<HotkeyData | HotkeyData[]> {
  if (id === undefined) {
    // Fetch all hotkeys (unchanged)
    const { data, error } = await supabase
      .from('hotkeys')
      .select('*')
      .order('downloads', { ascending: false });
    
    if (error) throw error;
    if (!data || data.length === 0) throw new Error('No hotkeys found');
    return data;
  }

  // Fetch the specific hotkey
  const { data, error } = await supabase
    .from('hotkeys')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  if (!data) throw new Error('Hotkey not found');

  // Check if this IP has viewed the hotkey in the last 24 hours
  if (ipAddress) {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: viewData, error: viewError } = await supabase
      .from('hotkey_views')
      .select('*')
      .eq('hotkey_id', id)
      .eq('ip_address', ipAddress)
      .gte('viewed_at', twentyFourHoursAgo)
      .single();

    if (viewError && viewError.code !== 'PGRST116') {
      console.error('Error checking view:', viewError);
    }

    if (!viewData) {
      // If no recent view, insert a new view record and increment the view count
      await supabase.from('hotkey_views').insert({ hotkey_id: id, ip_address: ipAddress });
      
      const { error: updateError } = await supabase
        .from('hotkeys')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', id);

      if (updateError) {
        console.error('Error updating view count:', updateError);
      }
    }
  }

  return data;
}