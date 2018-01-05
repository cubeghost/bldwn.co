export function extractQuery(data, key) {
  if (data) {
    return data[key].edges.map((edge) => {
      return edge.node;
    });
  }
}
