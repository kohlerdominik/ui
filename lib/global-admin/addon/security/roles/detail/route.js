import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { hash } from 'rsvp';

export default Route.extend({
  globalStore:         service(),
  roleTemplateService: service('roleTemplate'),

  model: function (params) {
    const store = get(this, 'globalStore');

    return hash({
      policies: store.find('podSecurityPolicyTemplate'),
      role:     get(this, 'roleTemplateService').fetchFilteredRoleTemplates(params.role_id),
      roles:    get(this, 'roleTemplateService').get('allFilteredRoleTemplates'),
    });
  },
});
