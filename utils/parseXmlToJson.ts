import { parseString } from 'xml2js';

export function parseXmlToJson(xmlString: string): Promise<any> {
  return new Promise((resolve, reject) => {
    parseString(xmlString, { explicitArray: false }, (err, result) => {
      if (err) {
        reject(new Error(`XML parsing error: ${err.message}`));
        console.error(err);
        return;
      }

      try {
        const parsedData: { [group: string]: { [key: string]: string } } = {};
        const keyprofile = result.keybindingsprofile.keyprofiles.keyprofile;
        const groups = keyprofile.keyprofilegroups.group;

        groups.forEach((group: any) => {
          const groupName = group.$.name;
          parsedData[groupName] = {};

          if (group.keymap) {
            const keymaps = Array.isArray(group.keymap) ? group.keymap : [group.keymap];
            keymaps.forEach((keymap: any) => {
              const name = keymap.name;
              const event = keymap.event;
              const action = keymap.action;
              
              // Only add bindings, skip unbindings
              if (action === 'bind' && event) {
                parsedData[groupName][name] = event;
              }
            });
          }
        });

        resolve(parsedData);
      } catch (error) {
        reject(new Error(`Error processing XML data: ${(error as Error).message}`));
        console.error(error);
      }
    });
  });
}