interface Edge {
  from: string;
  to: string;
  weight: number;
}

interface Node {
  name: string;
  distance: number;
  previous?: string;
}

export type { Edge, Node };

export function dijkstra(
  graph: { nodes: string[]; edges: Edge[] },
  start: string,
  end: string
): { distance: number | undefined; path: string[] | undefined } {
  const nodes: Node[] = graph.nodes.map((node) => ({
    name: node,
    distance: Infinity,
  }));

  const startNode = nodes.find((node) => node.name === start);
  if (!startNode) {
    return { distance: undefined, path: undefined };
  }
  startNode.distance = 0;

  const unvisited: Node[] = [...nodes];

  while (unvisited.length > 0) {
    const current = unvisited.reduce(
      (min, node) => (node.distance < min.distance ? node : min),
      unvisited[0]
    );
    unvisited.splice(unvisited.indexOf(current), 1);

    if (current.name === end) {
      return {
        distance: current.distance,
        path: reconstructPath(nodes, current),
      };
    }

    for (const edge of graph.edges) {
      if (edge.from === current.name) {
        const neighbor = nodes.find((node) => node.name === edge.to);
        if (neighbor) {
          const newDistance = current.distance + edge.weight;
          if (newDistance < neighbor.distance) {
            neighbor.distance = newDistance;
            neighbor.previous = current.name;
          }
        }
      }
    }
  }

  return { distance: undefined, path: undefined };
}

function reconstructPath(nodes: Node[], node: Node): string[] {
  const path: string[] = [];
  let current = node;
  while (current) {
    path.push(current.name);
    current = nodes.find((n: Node) => n.name === current.previous) as Node;
  }
  return path.reverse();
}

export function validateGraph(
  graph: { nodes: string[]; edges: Edge[] },
  start: string,
  end: string
): boolean | string {
  if (!graph.nodes.includes(start) || !graph.nodes.includes(end)) {
    console.error(
      `Błąd: Węzeł startu (${start}) lub końca (${end}) nie istnieje w grafie.`
    );
    return `Węzeł startu (${start}) lub końca (${end}) nie istnieje w grafie.`;
  }

  for (const edge of graph.edges) {
    if (!graph.nodes.includes(edge.from) || !graph.nodes.includes(edge.to)) {
      console.error(
        `Błąd: Krawędź ${edge.from} -> ${edge.to} zawiera nieistniejące węzły.`
      );
      return `Krawędź ${edge.from} -> ${edge.to} zawiera nieistniejące węzły.`;
    }
  }

  return true;
}
