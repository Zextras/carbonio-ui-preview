<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@zextras/carbonio-ui-preview](./carbonio-ui-preview.md) &gt; [MakeOptional](./carbonio-ui-preview.makeoptional.md)

## MakeOptional type

**Signature:**

```typescript
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [P in keyof T]?: T[P];
};
```
