# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),

## Unreleased

### Changed

- User menu data is now updated after profile creation so that it will correctly show the name of the newly created profile
- Upgrade HDS from version 0.11.3 to 0.20.0

### Fixed

- Year dependent failing snapshot test
- Browser test that would always fail until march
- Duplicate cancel button in information editing view
- Fixed issue where pages didn't have unique titles.
- [Accessibility] Links that did not warn when they opened in a new window
- [Accessibility] Cognitively challenging date input
- [Accessibility] Fixed the inconsistent use of HTML headings.
- [Accessibility] Add support for autocomplete to form fields
- [Accessibility] Mobile menu that was unusable on mobile
- [Accessibility] Misleading labels on logo and application name links
- [Accessibility] Missing jump to content link
- [Accessibility] Use more description error messages on forms
- Fixed inaccessible approver route

## [1.2.1] - 2020-11-25

### Added

- Temporary feedback link button in membership information page

### Changed

- Use GitHub actions instead of Travis
- Centralize notification with react-toastify.

## [1.2.0] - 2020-11-03

### Added

- E2E tests for emails and approval view
- E2E tests for modifying own information

### Changed

- Using an expired or non-existing approval token now displays a nice message to the user.

### Fixed

- Logging uninteresting error messages to Sentry

## [1.1.1] - 2020-10-07

### Added

- e2e - tests for viewing own information

### Fixed

- Fixed issue with loading profile data after logging in

## [1.1.0] - 2020-10-05

### Added

- Approvers can now control additional contact persons
- e2e - tests for youth's registration form.

### Changed

- Hide user menu and disable links to home page on approval form
- Replaced Cypress with TestCafe
- Default meta description

### Fixed

- Non existent dates being silently transformed into existing dates

## [1.0.1] - 2020-08-31

### Fixed

- Fixed issue where application would crash when entering `Profile information` page.

## [1.0.0] - 2020-08-28

### Changed

- Form fields are now validated on blur
- Profile creation and editing views are now divided into sections [#123](https://github.com/City-of-Helsinki/youth-membership-ui/pull/123)

### Added

- Controls for additional contact persons
- List of additional contact persons in membership details view

### Fixed

- Authentication info text position
- Hide spinners from birth day input on Firefox
- Missing profile language in approval view
- Photo usage approval not working when set from approval view
- Missing Helsinki profile link in mobile menu

## [1.0.0-rc.3]
