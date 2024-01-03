<template>
  <div
    :id="item.id?.toString()"
    class="relative"
  >
    <div
      @click="(e)=> {$emit('extend' , e, item)}"
    >
      <Badge
        :title="itemStatus"
        :class="classArray"
        :icon="iconName"
        :right-icon="true"
        :size="SizeTypeEnum.MD"
      />
    </div>
    <transition name="slide">
      <div
        v-if="active"
        v-click-outside="(e)=> {$emit('extend' , e, item)}"
        class="fixed flex justify-between top-20 rounded-lg bg-white left-0 right-0  w-40 shadow-2xl z-50"
        :style="[dropdownStyle]"
      >
        <ul class="px-4 py-5 col-12 max-h-max  overflow-auto sidebar-scroll">
          <h6 class="font-semibold mb-4">
            Status
          </h6>
          <li
            v-for="(menuItem, index) in dropdownMenu"
            :key="index"
            class="text-c-1 font-semibold text-gray-800 w-full flex items-center justify-between cursor-pointer mb-4"
            @click="(e) =>{$emit('set-status', item.id, menuItem.text);$emit('extend' , e, item)}"
          >
            {{ menuItem.text }}
            <Icon
              v-if="itemStatus === menuItem.text"
              icon="tick-circle"
              variant="linear"
              color="blue"
              :disable-fill="true"
              class="w-6 h-6"
            />
          </li>
        </ul>
        <div class="tester hidden" @click="(e)=> {$emit('extend' , e, item)}">
          <Icon
            icon="close-square"
            variant="linear"
            color="red"
            :disable-fill="true"
            class="w-6 h-6 mt-2"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { SizeTypeEnum, ButtonTypeEnum, ActionTypeEnum } from '@/components/ts/enums'
export default Vue.extend({
  props: {
    itemStatus: {
      type: String,
      default: ''
    },
    dropdownMenu: {
      type: Array as PropType<any[]>,
      default: () => {
        return []
      }
    },
    active: {
      type: Boolean
    },
    item: {
      type: Object,
      default: {}
    },
    dropdownStyle: {
      type: String,
      default: ''
    },
    iconName: {
      type: String,
      default: 'arrow-down-1'
    }
  },
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum
    }
  },
  computed: {
    classArray (): any[] {
      const classes = [] as any[]
      this.dropdownMenu.forEach((dropdown: any) => {
        const obj = this.itemStatus === dropdown.text ? `bg-${dropdown.bg}-100 text-${dropdown.bg}-800 w-${dropdown.w}` : ''
        classes.push(obj)
      })
      return classes
    }
  },
  methods: {
    findDiv (id: number) {
      if (this.active && id) {
        const offsets = ((document as Document).getElementById(id.toString()) as HTMLElement).getBoundingClientRect()
        const top = offsets.top
        const left = offsets.left
        return `left: ${left}; top: ${top}`
      } else {
        return this.dropdownStyle
      }
    }
  }
})
</script>

<style scoped>

</style>
