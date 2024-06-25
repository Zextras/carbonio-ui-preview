<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@zextras/carbonio-ui-preview](./carbonio-ui-preview.md) &gt; [PreviewNavigatorProps](./carbonio-ui-preview.previewnavigatorprops.md)

## PreviewNavigatorProps interface

**Signature:**

```typescript
export interface PreviewNavigatorProps extends Partial<Omit<HeaderProps, 'closeAction'>> 
```
**Extends:** Partial&lt;Omit&lt;[HeaderProps](./carbonio-ui-preview.headerprops.md)<!-- -->, 'closeAction'&gt;&gt;

## Properties

<table><thead><tr><th>

Property


</th><th>

Modifiers


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[closeAction?](./carbonio-ui-preview.previewnavigatorprops.closeaction.md)


</td><td>


</td><td>

Omit&lt;[HeaderAction](./carbonio-ui-preview.headeraction.md)<!-- -->, 'onClick'&gt;


</td><td>

_(Optional)_ Close action for the preview. The close action does not accept the onClick field, because its click callback is always set to be the onClose function.


</td></tr>
<tr><td>

[container?](./carbonio-ui-preview.previewnavigatorprops.container.md)


</td><td>


</td><td>

Element


</td><td>

_(Optional)_ HTML node where to insert the Portal's children. The default value is 'window.top.document'.


</td></tr>
<tr><td>

[disablePortal?](./carbonio-ui-preview.previewnavigatorprops.disableportal.md)


</td><td>


</td><td>

boolean


</td><td>

_(Optional)_ Flag to disable the Portal implementation


</td></tr>
<tr><td>

[onClose](./carbonio-ui-preview.previewnavigatorprops.onclose.md)


</td><td>


</td><td>

(e: React.SyntheticEvent \| KeyboardEvent) =&gt; void


</td><td>

Callback to hide the preview. This function is invoked by all events that must close the preview (closeAction, overlay click, keyboard shortcuts). In order to invoke the onClose only once when clicking on the closeAction, the event of the onClose should call preventDefault.


</td></tr>
<tr><td>

[onNextPreview?](./carbonio-ui-preview.previewnavigatorprops.onnextpreview.md)


</td><td>


</td><td>

(e: React.SyntheticEvent \| KeyboardEvent) =&gt; void


</td><td>

_(Optional)_ Callback invoked when the next preview is requested


</td></tr>
<tr><td>

[onOverlayClick?](./carbonio-ui-preview.previewnavigatorprops.onoverlayclick.md)


</td><td>


</td><td>

React.JSX.IntrinsicElements\['div'\]\['onClick'\]


</td><td>

_(Optional)_ Callback invoked when the preview overlay is clicked


</td></tr>
<tr><td>

[onPreviousPreview?](./carbonio-ui-preview.previewnavigatorprops.onpreviouspreview.md)


</td><td>


</td><td>

(e: React.SyntheticEvent \| KeyboardEvent) =&gt; void


</td><td>

_(Optional)_ Callback invoked when the previous preview is requested


</td></tr>
<tr><td>

[show](./carbonio-ui-preview.previewnavigatorprops.show.md)


</td><td>


</td><td>

boolean


</td><td>

Flag to show or hide Portal's content


</td></tr>
</tbody></table>