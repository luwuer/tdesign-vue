import { mount } from '@vue/test-utils';
import Tree from '@/src/tree/index.ts';
import { delay } from './kit';

describe('Tree:activable', () => {
  vi.useRealTimers();
  describe('props.activable', () => {
    it('设置 activable 为 true, 节点可以具有激活态', async () => {
      const data = [
        {
          value: 't1',
          children: [
            {
              value: 't1.1',
            },
            {
              value: 't1.2',
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree ref="tree" data={data} activable expand-all transition={false}></Tree>;
        },
      });
      await delay(1);
      const { tree } = wrapper.vm.$refs;
      tree.setItem('t1.1', {
        actived: true,
      });
      await delay(1);
      expect(wrapper.find('[data-value="t1"]').classes('t-is-active')).toBe(false);
      expect(wrapper.find('[data-value="t1.1"]').classes('t-is-active')).toBe(true);
      expect(wrapper.find('[data-value="t1.2"]').classes('t-is-active')).toBe(false);
      tree.setItem('t1.1', {
        actived: false,
      });
      await delay(1);
      expect(wrapper.find('[data-value="t1"]').classes('t-is-active')).toBe(false);
      expect(wrapper.find('[data-value="t1.1"]').classes('t-is-active')).toBe(false);
      expect(wrapper.find('[data-value="t1.2"]').classes('t-is-active')).toBe(false);
    });

    it('在 data 中可以预先设置激活态', async () => {
      const data = [
        {
          value: 't1',
          children: [
            {
              value: 't1.1',
              actived: true,
            },
            {
              value: 't1.2',
              actived: true,
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree ref="tree" data={data} activable expand-all transition={false}></Tree>;
        },
      });
      await delay(1);
      expect(wrapper.find('[data-value="t1"]').classes('t-is-active')).toBe(false);
      expect(wrapper.find('[data-value="t1.1"]').classes('t-is-active')).toBe(true);
      expect(wrapper.find('[data-value="t1.2"]').classes('t-is-active')).toBe(true);
    });
  });

  describe('props.defaultActived', () => {
    it('defaultActived 可以用来设置默认激活状态', async () => {
      const data = [
        {
          value: 't1',
          children: [
            {
              value: 't1.1',
            },
            {
              value: 't1.2',
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree ref="tree" data={data} activable defaultActived={['t1.1']} expand-all transition={false}></Tree>;
        },
      });
      await delay(1);
      expect(wrapper.find('[data-value="t1"]').classes('t-is-active')).toBe(false);
      expect(wrapper.find('[data-value="t1.1"]').classes('t-is-active')).toBe(true);
      expect(wrapper.find('[data-value="t1.2"]').classes('t-is-active')).toBe(false);
    });
  });

  describe('props.actived', () => {
    it('设置 actived 可指定激活节点', async () => {
      const data = [
        {
          value: 't1',
          children: [
            {
              value: 't1.1',
            },
            {
              value: 't1.2',
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree ref="tree" data={data} activable actived={['t1.1']} expand-all transition={false}></Tree>;
        },
      });
      await delay(1);
      expect(wrapper.find('[data-value="t1"]').classes('t-is-active')).toBe(false);
      expect(wrapper.find('[data-value="t1.1"]').classes('t-is-active')).toBe(true);
      expect(wrapper.find('[data-value="t1.2"]').classes('t-is-active')).toBe(false);
    });

    it('设置 actived 可变更激活节点', async () => {
      const data = [
        {
          value: 't1',
          children: [
            {
              value: 't1.1',
            },
            {
              value: 't1.2',
            },
          ],
        },
      ];
      const wrapper = mount({
        data() {
          return {
            actived: ['t1.1'],
          };
        },
        render() {
          return <Tree ref="tree" data={data} activable actived={this.actived} expand-all transition={false}></Tree>;
        },
      });
      await delay(1);
      expect(wrapper.find('[data-value="t1"]').classes('t-is-active')).toBe(false);
      expect(wrapper.find('[data-value="t1.1"]').classes('t-is-active')).toBe(true);
      expect(wrapper.find('[data-value="t1.2"]').classes('t-is-active')).toBe(false);
      wrapper.setData({
        actived: ['t1.2'],
      });
      await delay(1);
      expect(wrapper.find('[data-value="t1"]').classes('t-is-active')).toBe(false);
      expect(wrapper.find('[data-value="t1.1"]').classes('t-is-active')).toBe(false);
      expect(wrapper.find('[data-value="t1.2"]').classes('t-is-active')).toBe(true);
      wrapper.setData({
        actived: ['t1'],
      });
      await delay(1);
      expect(wrapper.find('[data-value="t1"]').classes('t-is-active')).toBe(true);
      expect(wrapper.find('[data-value="t1.1"]').classes('t-is-active')).toBe(false);
      expect(wrapper.find('[data-value="t1.2"]').classes('t-is-active')).toBe(false);
    });
  });

  describe('props.activeMultiple', () => {
    it('默认激活其他节点，原激活节点要取消激活状态', async () => {
      const data = [
        {
          value: 't1',
          actived: true,
          children: [
            {
              value: 't1.1',
            },
            {
              value: 't1.2',
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree ref="tree" data={data} activable expand-all transition={false}></Tree>;
        },
      });
      await delay(1);
      const { tree } = wrapper.vm.$refs;

      expect(wrapper.find('[data-value="t1"]').classes('t-is-active')).toBe(true);
      expect(wrapper.find('[data-value="t1.1"]').classes('t-is-active')).toBe(false);
      expect(wrapper.find('[data-value="t1.2"]').classes('t-is-active')).toBe(false);

      tree.setItem('t1.1', {
        actived: true,
      });

      await delay(1);

      expect(wrapper.find('[data-value="t1"]').classes('t-is-active')).toBe(false);
      expect(wrapper.find('[data-value="t1.1"]').classes('t-is-active')).toBe(true);
      expect(wrapper.find('[data-value="t1.2"]').classes('t-is-active')).toBe(false);

      tree.setItem('t1.2', {
        actived: true,
      });
      await delay(1);

      expect(wrapper.find('[data-value="t1"]').classes('t-is-active')).toBe(false);
      expect(wrapper.find('[data-value="t1.1"]').classes('t-is-active')).toBe(false);
      expect(wrapper.find('[data-value="t1.2"]').classes('t-is-active')).toBe(true);
    });

    it('设置 activeMultiple 为 true，节点激活状态互不关联', async () => {
      const data = [
        {
          value: 't1',
          actived: true,
          children: [
            {
              value: 't1.1',
            },
            {
              value: 't1.2',
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree ref="tree" data={data} activable expand-all activeMultiple={true} transition={false}></Tree>;
        },
      });
      await delay(1);
      const { tree } = wrapper.vm.$refs;

      expect(wrapper.find('[data-value="t1"]').classes('t-is-active')).toBe(true);
      expect(wrapper.find('[data-value="t1.1"]').classes('t-is-active')).toBe(false);
      expect(wrapper.find('[data-value="t1.2"]').classes('t-is-active')).toBe(false);

      tree.setItem('t1.1', {
        actived: true,
      });

      await delay(1);

      expect(wrapper.find('[data-value="t1"]').classes('t-is-active')).toBe(true);
      expect(wrapper.find('[data-value="t1.1"]').classes('t-is-active')).toBe(true);
      expect(wrapper.find('[data-value="t1.2"]').classes('t-is-active')).toBe(false);

      tree.setItem('t1.2', {
        actived: true,
      });
      await delay(1);

      expect(wrapper.find('[data-value="t1"]').classes('t-is-active')).toBe(true);
      expect(wrapper.find('[data-value="t1.1"]').classes('t-is-active')).toBe(true);
      expect(wrapper.find('[data-value="t1.2"]').classes('t-is-active')).toBe(true);
    });
  });
});
