# Alerts

Alerts are an easy way to let the user know about their interaction.

## How to use them

Alerts are used with this simple JavaScript function:
```javascript
info.create(Text, Type, Position, Time to disappear in seconds);
```

### Types

The type indicates the color of the warning.

| Types | Color scheme |
|-------|--------|
| INFO  | Blue   |
| SUCCESS| Lightgreen |
| WARNING | Orange |
| ERROR | Red |

! Make sure to write the types in CAPS !

The default value is INFO.

##### Example
```javascript
info.create("This is an error alert", ERROR, ...);

info.create("The text was copied successfully", SUCCESS , ...);
```


### Positions

The position indicates the position of the alert. Here, too, please all values in capital letters

Valid values are:
* LEFT
* CENTER
* RIGHT

The default value is RIGHT.

##### Example
```javascript
info.create("This is a left-aligned error message", ERROR, LEFT, ...);

info.create("This is a centered info message", INFO, CENTER, ...);
```


### Time to disappear (TTL)

The time until it disappears is given in seconds. If the time is 0, the display remains until it is closed manually.

Each alert has an animation when it closes, regardless of the TTL.

##### Example

```javascript
info.create("This right-aligned warning message despawns after five seconds",WARNING, RIGHT, 5);

info.create("This info will never disappear, if you don't close it manually.",INFO, CENTER, 0);
//OR LEAVE THE TTL BLANK
info.create("This info will never disappear, if you don't close it manually.",INFO, CENTER);
```


## Working example

```javascript
info.create("The text was copied successfully", SUCCESS, RIGHT,3);
```
This right-aligned success alert stays 3 seconds:
![Result](https://cdn.darkintaqt.com/image/git/alert-success-right-3-ttl.png)
