
<p align="center">
<img width="300" alt="speakbaselogo" src="https://user-images.githubusercontent.com/36661261/232208922-3e6eafe0-5ef4-4b42-9ca0-c2a0b48cf2dd.png">
  <h1 align="center">React chat window</h1>
  <p align="center">
    ✨ <a href="https://speak-base.com">https://speak-base.com</a> ✨
    <br/>
    React chat window for Speak Base's dashboard or to be used standalone.
  </p>
</p>
<br/>

![preview](https://user-images.githubusercontent.com/36661261/232208589-6be1bb8d-bd2c-4dd1-bca5-2e96fa681173.png)

Type safe React chat window. Easy integration. 


## Free dashboard

This React chat window comes with a free tier dashboard, and easy instructions on how to link them together. 
For more info, [click here](https://speak-base.com)

## Customizing 

Chat window prop types:

```ts
export interface ChatWindowProps {
  token?: string;
  messages?: message[];
  position?: 'left' | 'right';
  rightMessagesBackgroundColor?: string;
  headerTitleText?: string;
  headerSubtitleText?: string;
  closeElement?: React.ReactNode;
  sendText?: string;
  messageBoxPlaceholderText?: string;
}

export interface message {
  id: number;
  text: string;
  position: 'left' | 'right';
  time: string;
}
```

### Chat window props

--------------

```
token?: string
```

Optional token string, which takes in an organization token found in the dashboard. If provided, the chat window will connect to the dashboard. If not provided, standalone mode will be actived where a custom implementation can be done. 

--------------
```
messages?: messages[]
```

Optional messages array, which can be used in standalone mode. This way, you can make your own chat window system without using our dashboard.
Please view the ```message``` prop section for more info.

--------------
```
position?: 'left' | 'right'
```

Optional position string, which describes if the chat window will be left or right bottom fixed on the screen.


--------------
```
rightMessagesBackgroundColor?: string
```

optional bubble background color string, which will be the background color of the _right_ chat messages. Can be either a hex, rgba, string or any other valid css color format. Defaults to Tailwind's ```bg-indigo-500```

--------------
```
headerTitleText?: string
```

optional header title string, which can be used to change the default **Customer support** text.

--------------
```
headerSubtitleText?: string;
```

optional subtitle string, which can be used to change the default subtitle texts like: **We're connecting you to an agent.**

--------------
```
closeElement?: ReactNode;
```

optional close element, which can be used as the ```close``` button.

--------------
```
sendText?: string;
```

optional send button text, which can be used to change the default **send** text.


--------------
```
messageBoxPlaceholderText?: string;
```

Optional message input placeholder text, which can be used to change the default **Type a message...** text.


### Chat window props

--------------

```
id: string
```

Required id of the message. Can be any string, as long as its unique.

--------------
```
text: string
```

Required text of the message. 

--------------
```
position: 'left' | 'right'
```

Optional position string, which describes the message bubble either being left or right aligned. Right aligned bubble will be the ```rightMessagesBackgroundColor``` in case of standalone mode, or the style color configured in the dashboard.

--------------
```
time: dateTime ISO string
```

Optional time string, which descibes the time of the message. Will be formatted as 00:00.