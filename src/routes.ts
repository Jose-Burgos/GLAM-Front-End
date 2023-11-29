const ongPath = (subPath?: string) => '/ong/auth/' + (subPath || '') + '/';
export const OngRoutes = {
  dashboard: ongPath('home'),
  adoptions: ongPath('adoptions'),
  animals: ongPath('animals'),
};

const userPath = (subPath?: string) => '/user/auth/' + (subPath || '') + '/';
export const UserRoutes = {
  dashboard: userPath('home'),
  adoptions: userPath('adoptions'),
  animals: userPath('animals'),
};
