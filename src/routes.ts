const ongPath = (subPath?: string) => '/ong/auth/' + (subPath || '') + '/';
export const OngRoutes = {
  dashboard: ongPath('home'),
  adoptions: ongPath('adoptions'),
  animals: ongPath('animals'),
};
