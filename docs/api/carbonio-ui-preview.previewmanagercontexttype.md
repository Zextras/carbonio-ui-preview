<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@zextras/carbonio-ui-preview](./carbonio-ui-preview.md) &gt; [PreviewManagerContextType](./carbonio-ui-preview.previewmanagercontexttype.md)

## PreviewManagerContextType interface

**Signature:**

```typescript
export interface PreviewManagerContextType 
```

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

[createPreview](./carbonio-ui-preview.previewmanagercontexttype.createpreview.md)


</td><td>


</td><td>

(item: [MakeOptional](./carbonio-ui-preview.makeoptional.md)<!-- -->&lt;[PreviewItem](./carbonio-ui-preview.previewitem.md)<!-- -->, 'id'&gt;) =&gt; void


</td><td>

Initialize and open the preview for the given item


</td></tr>
<tr><td>

[emptyPreview](./carbonio-ui-preview.previewmanagercontexttype.emptypreview.md)


</td><td>


</td><td>

() =&gt; void


</td><td>

Clear the initialized previews


</td></tr>
<tr><td>

[initPreview](./carbonio-ui-preview.previewmanagercontexttype.initpreview.md)


</td><td>


</td><td>

(items: [PreviewItem](./carbonio-ui-preview.previewitem.md)<!-- -->\[\]) =&gt; void


</td><td>

Initialize the preview for the given items. This function does not open the preview. Use openPreview to open the preview for one of the initialized items.


</td></tr>
<tr><td>

[openPreview](./carbonio-ui-preview.previewmanagercontexttype.openpreview.md)


</td><td>


</td><td>

(id: string) =&gt; void


</td><td>

Open the preview for the item with the given id. The item must have been initialized before with the initPreview method.


</td></tr>
</tbody></table>
