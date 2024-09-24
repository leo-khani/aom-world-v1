import { supabase } from '@/client/supabase';
import xml2js from 'xml2js';
import { ModifyHotkeyRequest, HotkeyData } from './type';


export async function modifyHotkey(userId: string, request: ModifyHotkeyRequest): Promise<HotkeyData> {
  const { id, title, description, xmlFile } = request;

  // Check if the hotkey belongs to the user
  const { data: existingHotkey, error: fetchError } = await supabase
    .from('hotkeys')
    .select('userId')
    .eq('id', id)
    .single();

  if (fetchError) throw fetchError;

  if (!existingHotkey || existingHotkey.userId !== userId) {
    throw new Error('Forbidden');
  }

  const updateData: any = { title, description };

  if (xmlFile) {
    // Parse new XML file
    const parser = new xml2js.Parser();
    const hotkeyData = await parser.parseStringPromise(xmlFile);

    // Upload new XML file to storage
    const { data: fileData, error: fileError } = await supabase.storage
      .from('hotkey_files')
      .upload(`${userId}/${title}.xml`, Buffer.from(xmlFile), { upsert: true });

    if (fileError) throw fileError;

    updateData.hotkey_data = hotkeyData;
    updateData.hotkey_file = fileData.path;
  }

  // Update hotkey data in the database
  const { data, error } = await supabase
    .from('hotkeys')
    .update(updateData)
    .eq('id', id)
    .single();

  if (error) throw error;

  return data;
}