function parseEdge(str) {
    const edge = str.trim();
  
    if (!/^[A-Z]->[A-Z]$/.test(edge)) {
      return null;
    }
  
    const [parent, child] = edge.split("->");
  
    if (parent === child) {
      return null;
    }
  
    return { parent, child };
  }
  
  module.exports = parseEdge;