function getDepth(node, graph) {
    const children = graph.get(node) || [];
  
    if (children.length === 0) {
      return 1;
    }
  
    let best = 0;
  
    for (const child of children) {
      best = Math.max(best, getDepth(child, graph));
    }
  
    return best + 1;
  }
  
  module.exports = getDepth;