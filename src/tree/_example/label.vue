<template>
  <t-space :size="32" direction="vertical" class="tdesign-tree-demo">
    <t-space :size="10" direction="vertical">
      <h3 class="title">属性设置 jsx 形式</h3>
      <t-tree :data="items" expand-all :label="label"></t-tree>
    </t-space>
    <t-space :size="10" direction="vertical">
      <h3>slot 形式</h3>
      <t-tree :data="items" expand-all checkable>
        <template #label="{ node }">
          <font color="blue">label: {{ node.label }}, value: {{ node.value }}</font>
        </template>
      </t-tree>
    </t-space>
  </t-space>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          label: '1',
          children: [
            {
              label: '1.1',
            },
            {
              label: '1.2',
            },
          ],
        },
        {
          label: '2',
          children: [
            {
              label: '2.1',
            },
            {
              label: '2.2',
            },
          ],
        },
      ],
      label(createElement, node) {
        return createElement('strong', {
          domProps: {
            innerHTML: `value: ${node.value}, label: ${node.label}`,
          },
        });
      },
    };
  },
};
</script>
