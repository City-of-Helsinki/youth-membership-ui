# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),

## Unreleased

## [1.4.3] - 2022-10-12

### Changed

- [#305](https://github.com/City-of-Helsinki/youth-membership-ui/pull/305) Remove the update and remove addresses fields from the create profile mutation

## [1.4.2] - 2021-12-09

### Changed

- [#288](https://github.com/City-of-Helsinki/youth-membership-ui/pull/288) Reorder GraphQL calls for creating youth membership

## [1.4.1] - 2021-08-25

### Changed

- [#279](https://github.com/City-of-Helsinki/youth-membership-ui/pull/279) Add and update translations
- [#272](https://github.com/City-of-Helsinki/youth-membership-ui/pull/272) Add email template resource files
- [#273](https://github.com/City-of-Helsinki/youth-membership-ui/pull/273) Fix additional contact languages feature flag
- [#271](https://github.com/City-of-Helsinki/youth-membership-ui/pull/271) Change copy profile language to preferred language
- [#270](https://github.com/City-of-Helsinki/youth-membership-ui/pull/270) Allow approver to change language at home value
- [#269](https://github.com/City-of-Helsinki/youth-membership-ui/pull/269) Use same language order as is used in Mun Stadi page
- [#267](https://github.com/City-of-Helsinki/youth-membership-ui/pull/267) Change language at home field to preferred contact language field
- [#264](https://github.com/City-of-Helsinki/youth-membership-ui/pull/264) Add placeholder translations for fr, ru, et, so and ar
- [#263](https://github.com/City-of-Helsinki/youth-membership-ui/pull/263) Register locales within I18nService
- [#265](https://github.com/City-of-Helsinki/youth-membership-ui/pull/265) Control additional languages with a feature flag
- [#262](https://github.com/City-of-Helsinki/youth-membership-ui/pull/262) Remove forced right aligns from text
- [#261](https://github.com/City-of-Helsinki/youth-membership-ui/pull/261) Use i18n service to find options for language menu

## [1.4.0] - 2021-03-16

### Added

- Logic to handle the renewing membership status
- Option to define additional locales with environment variables
- Support for language direction detection based on locale
- Placeholder translations for French, Russian, Estonian, Somali and Arabic
- French, Russian, Somali, Arabic and Estonian into language at home select

### Changed

- [#260](https://github.com/City-of-Helsinki/youth-membership-ui/pull/260) Add support for language direction detection based on locale
- Updated links to youth membership application form.
- Country select to dynamically find supported languages from the I18nService
- Language at home field into preferred language field

### Removed

- Hardcoded right aligns with text in order to better support right-to-left languages

## [1.4.0] - 2021-03-16

### Changed

- [#259](https://github.com/City-of-Helsinki/youth-membership-ui/pull/259) Option to define additional locales with environment variables
- [#249](https://github.com/City-of-Helsinki/youth-membership-ui/pull/249), [#251](https://github.com/City-of-Helsinki/youth-membership-ui/pull/251) Logic to handle the renewing membership status
- [#250](https://github.com/City-of-Helsinki/youth-membership-ui/pull/250) Add language to page urls

### Fixed

- [#247](https://github.com/City-of-Helsinki/youth-membership-ui/pull/247) Approval process always allowing photo usage regardless of choice
- [#248](https://github.com/City-of-Helsinki/youth-membership-ui/pull/248) [Accessibility] Announce title changes with aria-live

### Removed

- [#252](https://github.com/City-of-Helsinki/youth-membership-ui/pull/252) Feedback link into user survey

## [1.3.2] - 2021-02-18

### Fixed

- Use correct API scope for youth membership

## [1.3.1] - 2021-02-18

### Fixed

- Incorrect federation location

## [1.3.0] - 2021-02-18

### Changed

- [#194](https://github.com/City-of-Helsinki/youth-membership-ui/pull/194) User menu data is now updated after profile creation so that it will correctly show the name of the newly created profile
- [#199](https://github.com/City-of-Helsinki/youth-membership-ui/pull/199) Upgrade HDS from version 0.11.3 to 0.20.0
- [#219](https://github.com/City-of-Helsinki/youth-membership-ui/pull/219) Use public address for Jassari API
- [#232](https://github.com/City-of-Helsinki/youth-membership-ui/pull/232) Run browser tests against PR environments

### Fixed

- [#198](https://github.com/City-of-Helsinki/youth-membership-ui/pull/198) Year dependent failing snapshot test
- [#197](https://github.com/City-of-Helsinki/youth-membership-ui/pull/197) Browser test that would always fail until march
- [#203](https://github.com/City-of-Helsinki/youth-membership-ui/pull/203) [Accessibility] Duplicate cancel button in information editing view
- [#204](https://github.com/City-of-Helsinki/youth-membership-ui/pull/204) [Accessibility] Fixed issue where pages didn't have unique titles.
- [#205](https://github.com/City-of-Helsinki/youth-membership-ui/pull/205) [Accessibility] Links that did not warn when they opened in a new window
- [#207](https://github.com/City-of-Helsinki/youth-membership-ui/pull/207) [Accessibility] Cognitively challenging date input
- [#206](https://github.com/City-of-Helsinki/youth-membership-ui/pull/206) [Accessibility] Fixed the inconsistent use of HTML headings.
- [#209](https://github.com/City-of-Helsinki/youth-membership-ui/pull/209) [Accessibility] Add support for autocomplete to form fields
- [#201](https://github.com/City-of-Helsinki/youth-membership-ui/pull/201) [Accessibility] Mobile menu that was unusable on mobile
- [#201](https://github.com/City-of-Helsinki/youth-membership-ui/pull/201) [Accessibility] Misleading labels on logo and application name links
- [#201](https://github.com/City-of-Helsinki/youth-membership-ui/pull/201) [Accessibility] Missing jump to content link
- [#208](https://github.com/City-of-Helsinki/youth-membership-ui/pull/208) [Accessibility] Use more description error messages on forms
- [#214](https://github.com/City-of-Helsinki/youth-membership-ui/pull/214) [Accessibility] Fixed inaccessible approver route
- [#237](https://github.com/City-of-Helsinki/youth-membership-ui/pull/237) Translation script running within docker development image
- [#239](https://github.com/City-of-Helsinki/youth-membership-ui/pull/239) Gendered pronoun in approval confirmation view
- [#240](https://github.com/City-of-Helsinki/youth-membership-ui/pull/240) Non-compound words written as compound words in English translation

## [1.2.5] - 2021-02-03

### Changed

- Fix privacy policy links

## [1.2.4] - 2021-02-01

Re-release of v1.2.1 using fixed GitHub actions workflow.

## [1.2.3] - 2021-02-01

Re-release of v1.2.1 using fixed GitHub actions workflow.

## [1.2.2] - 2021-01-19

Re-release of v1.2.1 using GitHub actions workflow.

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
