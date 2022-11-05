```css
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill::selection,
input:-webkit-autofill:active {
	transition: background-color 5000s ease-in-out 0s;
	-webkit-text-fill-color: blue;
}

input::selection,
textarea::selection,
input:-webkit-autofill::selection,
textarea:-webkit-autofill::selection,
{
	-webkit-text-fill-color: #FFF;
	background-color: blue;
}
```
