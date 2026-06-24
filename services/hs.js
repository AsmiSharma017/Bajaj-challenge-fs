const parseEdge = require("../utils/edge");
const hasCycle = require("../utils/cycle");
const makeTree = require("../utils/tree");
const getDepth = require("../utils/depth");

function processData(data) {
  const invalidEntries = [];
  const duplicateEdges = [];

  const graph = new Map();
  const parentMap = new Map();

  const nodes = new Set();
  const seen = new Set();

  for (const raw of data) {
    const edge = parseEdge(raw);

    if (!edge) {
      invalidEntries.push(raw);
      continue;
    }

    const key = `${edge.parent}->${edge.child}`;

    if (seen.has(key)) {
      if (!duplicateEdges.includes(key)) {
        duplicateEdges.push(key);
      }
      continue;
    }

    seen.add(key);

    if (parentMap.has(edge.child)) {
      continue;
    }

    parentMap.set(edge.child, edge.parent);

    if (!graph.has(edge.parent)) {
      graph.set(edge.parent, []);
    }

    graph.get(edge.parent).push(edge.child);

    nodes.add(edge.parent);
    nodes.add(edge.child);
  }

  const visited = new Set();

  const hierarchies = [];

  let totalTrees = 0;
  let totalCycles = 0;

  let largestDepth = -1;
  let largestRoot = "";

  function collect(start) {
    const stack = [start];
    const comp = new Set();

    while (stack.length) {
      const node = stack.pop();

      if (comp.has(node)) continue;

      comp.add(node);

      const children = graph.get(node) || [];

      for (const child of children) {
        stack.push(child);
      }

      const parent = parentMap.get(node);

      if (parent) {
        stack.push(parent);
      }
    }

    comp.forEach(x => visited.add(x));

    return comp;
  }

  for (const node of nodes) {
    if (visited.has(node)) continue;

    const comp = collect(node);

    const roots = [...comp]
      .filter(x => !parentMap.has(x))
      .sort();

    const root =
      roots.length > 0
        ? roots[0]
        : [...comp].sort()[0];

    const cycle = hasCycle(
      root,
      graph,
      new Set(),
      new Set()
    );

    if (cycle) {
      totalCycles++;

      hierarchies.push({
        root,
        tree: {},
        has_cycle: true
      });

      continue;
    }

    const tree = makeTree(root, graph);
    const depth = getDepth(root, graph);

    totalTrees++;

    if (
      depth > largestDepth ||
      (depth === largestDepth &&
        root < largestRoot)
    ) {
      largestDepth = depth;
      largestRoot = root;
    }

    hierarchies.push({
      root,
      tree,
      depth
    });
  }

  return {
    user_id: "asmi_17052005",
    email_id: "asmi1548.be23@chitkara.edu.in",
    college_roll_number: "2310991548",
    hierarchies,
    invalid_entries: invalidEntries,
    duplicate_edges: duplicateEdges,
    summary: {
      total_trees: totalTrees,
      total_cycles: totalCycles,
      largest_tree_root: largestRoot
    }
  };
}

module.exports = processData;