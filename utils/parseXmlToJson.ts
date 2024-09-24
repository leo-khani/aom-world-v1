import { parseString } from "xml2js";

export function parseXmlToJson(xmlString: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!xmlString || typeof xmlString !== 'string') {
        reject(new Error('Invalid XML string provided'));
        return;
      }
  
      parseString(xmlString, (err, result) => {
        if (err) {
          reject(new Error(`XML parsing error: ${err.message}`));
          return;
        }
  
        try {
          console.log("Parsed XML Result:", result); // Log parsed result
          if (!result || !result.hotkeyfile || !Array.isArray(result.hotkeyfile.hotkeygroup)) {
            reject(new Error('Invalid XML structure: missing hotkeyfile or hotkeygroup'));
            return;
          }
  
          const parsedData: { [group: string]: { [key: string]: string } } = {};
          const hotkeyGroups = result.hotkeyfile.hotkeygroup;
  
          hotkeyGroups.forEach((group: any, index: number) => {
            if (!group.$ || !group.$.name) {
              throw new Error(`Missing group name in hotkeygroup at index ${index}`);
            }
  
            const groupName = group.$.name;
            parsedData[groupName] = {};
  
            if (!Array.isArray(group.hotkey)) {
              throw new Error(`Invalid hotkey structure in group "${groupName}"`);
            }
  
            group.hotkey.forEach((hotkey: any, hotkeyIndex: number) => {
              if (!hotkey.$ || !hotkey.$.key || !hotkey.$.value) {
                throw new Error(`Invalid hotkey at index ${hotkeyIndex} in group "${groupName}"`);
              }
  
              const key = hotkey.$.key;
              const value = hotkey.$.value;
              parsedData[groupName][key] = value;
            });
          });
  
          resolve(parsedData);
        } catch (error) {
          reject(new Error(`Error processing XML data: ${(error as Error).message}`));
        }
      });
    });
  }