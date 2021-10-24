# Forms

Forms are the only way to enter text in html. So why don't we make them a little more beautiful?

## How to

The script only takes the input elements that have the parent element with the class .djs.formarea.
```html
<!-- This works: -->
<div class="djs formarea">
  <input type="text" name="username" placeholder="Username">
<div>


<!-- This won't work: -->
<input type="text" name="username" placeholder="Username">
```

The stylesheet then directly applys a style to all elements.

### Creating "Floating Labels"

What are Floating Labels?

When you focus on an input and / or enter text, the placeholder is moved up.
![Result](https://cdn.darkintaqt.com/image/git/forms-floating-on.png)
![Result](https://cdn.darkintaqt.com/image/git/forms-floating-showed.png)

```javascript
let inputelement = document.getElementById("mytextinput");
form.beautify(inputelement);
```

If you want to customize all elements, you can also use ALL.
```javascript
form.beautify(ALL);
```
