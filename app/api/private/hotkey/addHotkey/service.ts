import { supabase } from "@/client/supabase";
import { AddHotkeyRequest, HotkeyData } from "./type";

export async function addHotkey(request: AddHotkeyRequest): Promise<HotkeyData> {
  const { email, title, description, xmlFile } = request;

  // Generate a unique identifier for the file
  const fileId = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

  // Create a sanitized file name
  const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const fileName = `${sanitizedTitle}_${fileId}.xml`;

  // Upload XML file to storage
  const { data: fileData, error: fileError } = await supabase.storage
    .from('hotkey_files')
    .upload(`v1/${fileName}`, xmlFile, {
      contentType: 'application/xml',
      upsert: false
    });

  if (fileError) throw fileError;

  // Generate a public URL for the file
  const { data: publicUrlData } = supabase.storage
    .from('hotkey_files')
    .getPublicUrl(`v1/${fileName}`);


  const publicUrl = publicUrlData.publicUrl;

  // Insert hotkey data into the database
  const { data, error } = await supabase
    .from('hotkeys')
    .insert({
      email,
      title,
      description,
      hotkey_file: fileData.path,
      download_url: publicUrl
    })
    .single();

  if (error) throw error;

  return data;
}
