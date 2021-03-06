import { withPluginApi } from 'discourse/lib/plugin-api';
import { exportUserArchive } from 'discourse/lib/export-csv';

export default {
  name: 'legal-edits',
  initialize() {
    withPluginApi('0.8.12', api => {
      api.modifyClass('controller:user-activity', {
        actions: {
          exportUserArchive() {
            const extendedUserDownload = Discourse.SiteSettings.legal_extended_user_download;
            if (extendedUserDownload) {
              bootbox.confirm(
                I18n.t("user.download_archive.confirm_all"),
                I18n.t("no_value"),
                I18n.t("yes_value"),
                confirmed => confirmed ? exportUserArchive() : null
              );
            } else {
              this._super();
            }
          }
        }
      })
    })
  }
}
