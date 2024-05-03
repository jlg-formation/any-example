# Gestion Stock

## Challenges

### Migrate to the last angular version

- use pnpm
- use at least Angular 17
- principle of mimimum modification for src directory only
- do not use `ng update` but stay informed of what to do using the website https://update.angular.io/
- make sure there is no vulnerabilities anymore `npm audit` (or you need a very good reason)
- use a proxy for http request

### Update the code to use only standalone artefacts

- update all components, directives, pipes
- no more modules

### Update the code to have no more CommonModule

- use @if, @for instead of *ngIf, *ngFor
- use directly pipe if needed

### Use Lazyloading everywhere except home page

- use dynamic import
- use default export to short code.

### Use typings in form

- no more "as" in the code (dangerous)
- using nonnullable
- using formbuilder

### Validators

- custom validator with service
- error management in a field

- async validator with http service
- add debounce to async validator
- add disabled on submit button when form is pending

### Signal and computed

- define a signal from an existing observable
- define a signal from a value
