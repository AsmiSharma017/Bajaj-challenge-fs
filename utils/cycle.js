function hasCycle(node, graph, visiting, visited) {
    if (visiting.has(node)) return true;
    if (visited.has(node)) return false;
  
    visiting.add(node);
  
    const children = graph.get(node) || [];
  
    for (const child of children) {
      if (hasCycle(child, graph, visiting, visited)) {
        return true;
      }
    }
  
    visiting.delete(node);
    visited.add(node);
  
    return false;
  }
  
  module.exports = hasCycle;