export default function matchRoles(endpointRoles: string[], userRoles: string[]): boolean {
  let result: boolean = true;

  endpointRoles.forEach((role) => {
    if (!userRoles.includes(role)) {
      result = false;
    }
  });

  return result;
}
