export interface AddHotkeyRequest {
    title: string;
    description: string;
    xmlFile: File;
    email: string;
  }
  
  export interface HotkeyData {
    id: number;
    userId: string;
    title: string;
    description: string;
    views: number;
    downloads: number;
    likes: number;
    comments: any[];
    hotkey_data: any;
    hotkey_file: string;
    created_at: string;
  }

  export interface HotkeyData {
    id: number;
    title: string;
    description: string;
    hotkey_file: string;
    download_url: string;
  }