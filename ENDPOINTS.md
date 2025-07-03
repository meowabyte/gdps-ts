# ENDPOINTS.md

Currently this project is heavily WIP so not every feature works as intented, some of them are though, here's the list.

### ✅ Working endpoints:

-   `/getGJRewards.php` - Daily chests
-   `/getGJUserInfo20.php` - Profile preview
-   `/requestUserAccess.php` - Requesting mod features
-   `/updateGJAccSettings20.php` - Updating profile privacy settings & social media
-   `/accounts/backupGJAccountNew.php` - Backup user save
-   `/accounts/syncGJAccountNew.php` - Load user save from cloud
-   `/accounts/loginGJAccount.php` - Logging in

### ⚠️ Semi-Working endpoints

-   `/updateGJUserScore22.php` - Updating profile score (stars, moons, etc.)
    -   this endpoint won't work fully until level system be fully implemented! (currently demons are counted as total and saved as classic easy demons count)
-   `/getAccountURL.php` - Get backup URL
    -   currently hardcoded to GDPS' base url
-   `/uploadGJAccComment20.php`
    -   only commands work
    -   comment uploading does nothing
    -   requires fully working profile system (WIP)
-   `/accounts/registerGJAccount.php` - Registration
    -   email verification is ignored

Also take a note that this won't be 1:1 implementation of RobTop's Geometry Dash server, additionally I might add some useful features that will replace other ones in case of difficulty in implementing.
