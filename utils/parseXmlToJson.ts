// utils/xmlParser.ts
import { parseString } from 'xml2js';

export function parseXmlToJson(xmlString: string): Promise<any> {
  return new Promise((resolve, reject) => {
    parseString(xmlString, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const parsedData: { [group: string]: { [key: string]: string } } = {};
        const hotkeyGroups = result.hotkeyfile.hotkeygroup;

        hotkeyGroups.forEach((group: any) => {
          const groupName = group.$.name;
          parsedData[groupName] = {};

          group.hotkey.forEach((hotkey: any) => {
            const key = hotkey.$.key;
            const value = hotkey.$.value;
            parsedData[groupName][key] = value;
          });
        });

        resolve(parsedData);
      }
    });
  });
}