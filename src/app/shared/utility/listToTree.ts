export function ListToTree(arr: any): any {

   let map = {}, node, res = [], i;
   for (i = 0; i < arr.length; i += 1) {
      map[arr[i].id] = i;
      arr[i].children = [];
   };
   for (i = 0; i < arr.length; i += 1) {
      node = arr[i];
      if (node.parentId) {
         arr[map[node.parentId]].children.push(node);
      }
      else {
         res.push(node);
      };
   };
   return res;
}      