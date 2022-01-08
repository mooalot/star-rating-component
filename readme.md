# star-rating

![image](https://drive.google.com/uc?export=view&id=1xSMT5hOSHQPgEMwESSGMnXhQbJvmkiyB)

## Installation 
`npm i star-rating-component`

### Angular

Add this to your `app.module.ts`
```typescript

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  ...
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
  ...
})
export class AppModule { }
  ```

Add this to `main.ts`
```Typescript
import { defineCustomElements } from '@igabe/star-rating/loader'

defineCustomElements(window)
```

### Other frameworks

This is just a stencil component, so it can be used in other frameworks.

## Properties

| Property        | Attribute        | Description | Type      | Default |
| --------------- | ---------------- | ----------- | --------- | ------- |
| `defaultRating` | `default-rating` | The default rating when the component is loaded            | `number`  | `3`     |
| `numStars`      | `num-stars`      | The total number of stars           | `number`  | `5`     |
| `rounded`       | `rounded`        | Gives the stars a more bubbly look            | `boolean` | `true`  |


Component does not allow for zero stars. Good for us, better reviews.

## Events

| Event          | Description | Type               |
| -------------- | ----------- | ------------------ |
| `ratingChange` | Emitted when the rating is changed            | `CustomEvent<any>` |



## Styling

These css variables can be overridden 

```
    --rating-active-fill-color 
    --rating-inactive-fill-color 
    --rating-active-stroke-color 
    --rating-inactive-stroke-color 
    --rating-star-size 
    --rating-star-spacing 
    --rating-star-shadow-color 
```

## Example

.html

```html
<star-rating rounded="true" defaultRating="3" numStars="5" (ratingChange)="ratingChange($event)"></star-rating>
```

.ts
```Typescript
ratingChange(event) {
    console.log('New rating: ', event.detail);
  }
```

.css

```css
star-rating {
    --rating-active-fill-color: #f5f846;
    --rating-inactive-fill-color: #d8d8d8;
    --rating-active-stroke-color: #ffb400;
    --rating-inactive-stroke-color: #d8d8d8;
    --rating-star-size: 2rem;
    --rating-star-spacing: 0.1rem;
    --rating-star-shadow-color: rgba(0, 0, 0, .7);
}
```


----------------------------------------------

