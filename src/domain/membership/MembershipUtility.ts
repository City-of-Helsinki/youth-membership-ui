import Config from '../../config';

class Membership {
  static getAdminUrl(profileId: null | string) {
    const url = Config.adminUrl;

    if (!profileId) {
      return null;
    }

    return `${url}youthProfiles/${profileId}/show`;
  }

  static getFullName(profile: null | { firstName: string; lastName: string }) {
    if (!profile) {
      return '';
    }

    const { firstName, lastName } = profile;

    return `${firstName} ${lastName}`.trim();
  }
}

export default Membership;
