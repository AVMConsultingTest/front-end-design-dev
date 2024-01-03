<template>
  <div class="md:w-[1100px] mx-auto my-10 relative">
    <div class="absolute right-0 top-0 w-8 h-8 rounded-full cursor-pointer" @click="switchMode">
      <Icon
        :icon="darkMode ? 'sun' : 'moon'"
        color="gray"
        class="w-5 h-5"
      />
    </div>
    <div class="page-header row flex border-b border-grey-blue-100 pb-5 mb-5">
      <div class="col-auto pt-2 cursor-pointer">
        <Icon
          icon="arrow-left"
          color="gray"
          class="w-5 h-5"
        />
      </div>
      <div class="col-auto">
        <h4 class="font-medium block dark:text-white">
          Lorem Ipsum
        </h4>
        <div class="font-semibold block">
          <span class="font-medium text-b-4 text-gray-800 dark:text-gray-300">Monday</span>
          <span class="font-medium text-b-4 text-gray-400 dark:text-gray-500">17 October 2022</span>
        </div>
      </div>
    </div>
    <div class="row mb-5">
      <div v-for="(load,index) in loads" :key="index" class="col-12 mb-4">
        <LoadCard :data="load" />
      </div>
    </div>
    <div class="col-6">
      <div class="flex">
        <button class="decrease-button items-center justify-center" @click="decreaseValue">
          -
        </button>
        <div class="select-wrapper col-1">
          <Input v-model="inputValue" class="input-field" />
        </div>
        <button class="increase-button items-center justify-center" @click="increaseValue">
          +
        </button>
      </div>
      <m-select
        v-model="firstName"
        :options="selectOptions"
        :bind-text="true"
        name="ticketed"
        type="text"
        label="Ticketed"
        rules="required"
      />
    </div>
    <div>
      <input v-model="searchQuery" @input="performSearch">
      <ul v-if="searchResults.length">
        <li v-for="result in searchResults" :key="result.id">
          {{ result.name }}
        </li>
      </ul>
      <p v-else>
        No results found.
      </p>
    </div>
    <div class="row mb-5">
      <h4 class="font-semibold mb-2 dark:text-white">
        Widgets
      </h4>
      <div class="col-4 my-5">
        <widget :title="`Active Drivers`" icon="square" icon-color="green" hint="Test hint">
          <h4 class="text-xl  font-semibold">
            Test
          </h4>
          <p class="text-grey-dark-200 font-medium text-xs">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
        </widget>
      </div>
      <div class="col-4 my-5">
        <widget :title="`Outstanding DVER`" icon="personalcard" icon-color="purple" hint="Test hint">
          <h4 class="text-xl  font-semibold">
            Test
          </h4>
          <p class="text-grey-dark-200 font-medium text-xs">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
        </widget>
      </div>
      <div class="col-4 my-5">
        <widget :title="`Off-duty Drivers`" icon="chart" icon-color="red" hint="Test hint">
          <h4 class="text-xl font-semibold">
            Test
          </h4>
          <p class="text-grey-dark-200 font-medium text-xs">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
        </widget>
      </div>
    </div>
    <div class="row mb-5">
      <div class="w-full flex items-center justify-between">
        <div>
          <span class="text-secondary text-b-3 font-medium flex items-center cursor-pointer dark:text-white" title="Test">
            Other Metrics
            <Icon
              icon="info-circle"
              color="grey-dark"
              :alpha="200"
              class="ml-2 w-4 h-4"
            />
          </span>
        </div>

        <a href="#" class="text-gray-400 text-c-1 font-medium dark:text-white">Go to Details</a>
      </div>
      <div class="col-3 my-5">
        <widget :title="`Crash Indicator`" hint="Test hint" :no-shadow="true" :no-border="true" go-to="/">
          <h4 class="text-xl font-semibold">
            Test
          </h4>
          <p class="text-grey-dark-200 font-medium text-xs">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
        </widget>
      </div>
      <div class="col-3 my-5">
        <widget :title="`HOS Compliance`" hint="Test hint" :no-shadow="true" :no-border="true">
          <h4 class="text-xl font-semibold">
            Test
          </h4>
          <p class="text-grey-dark-200 font-medium text-xs">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
        </widget>
      </div>
      <div class="col-3 my-5">
        <widget :title="`Vehicle Maintanence`" hint="Test hint" :no-shadow="true" :no-border="true">
          <h4 class="text-xl font-semibold">
            Test
          </h4>
          <p class="text-grey-dark-200 font-medium text-xs">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
        </widget>
      </div>
      <div class="col-3 my-5">
        <widget :title="`Controlled Substance`" hint="Test hint" :no-shadow="true" :no-border="true">
          <h4 class="text-xl font-semibold">
            Test
          </h4>
          <p class="text-grey-dark-200 font-medium text-xs">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
        </widget>
      </div>
    </div>

    <div class="row mb-5">
      <div class="col-7">
        <div class="row">
          <div class="col-4 mb-6">
            <div class="bg-indigo-50 flex flex-col items-center justify-center p-5 rounded-xl">
              <div class="icon w-8 h-8 bg-indigo-200 flex items-center justify-center rounded-full mb-2">
                <Icon
                  icon="calendar"
                  color="gray"
                  :alpha="800"
                  :size="16"
                  variant="outline"
                  class="w-5 h-5"
                />
              </div>
              <div class="info">
                <span class="font-semibold text-sm block text-center">2020</span>
                <span class="text-gray-400 text-xs block text-center">Model Year</span>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="bg-purple-100 flex flex-col items-center justify-center p-5 rounded-xl">
              <div class="icon w-8 h-8 bg-purple-200 flex items-center justify-center rounded-full mb-2">
                <Icon
                  icon="document"
                  :size="16"
                  color="gray"
                  :alpha="800"
                  variant="outline"
                  class="w-5 h-5"
                />
              </div>
              <div class="info">
                <span class="font-semibold text-sm block text-center">2020</span>
                <span class="text-gray-400 text-xs block text-center">Model Year</span>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="bg-blue-50 flex flex-col items-center justify-center p-5 rounded-xl">
              <div class="icon w-8 h-8 bg-blue-200 flex items-center justify-center rounded-full mb-2">
                <Icon
                  icon="square"
                  :size="16"
                  color="gray"
                  :alpha="800"
                  variant="outline"
                  class="w-5 h-5"
                />
              </div>
              <div class="info">
                <span class="font-semibold text-sm block text-center">2020</span>
                <span class="text-gray-400 text-xs block text-center">Model Year</span>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="bg-green-50 flex flex-col items-center justify-center p-5 rounded-xl">
              <div class="icon w-8 h-8 bg-green-200 flex items-center justify-center rounded-full mb-2">
                <Icon
                  icon="truck"
                  :size="16"
                  color="gray"
                  :alpha="800"
                  variant="outline"
                  class="w-5 h-5"
                />
              </div>
              <div class="info">
                <span class="font-semibold text-sm block text-center">2020</span>
                <span class="text-gray-400 text-xs block text-center">Model Year</span>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="bg-yellow-50 flex flex-col items-center justify-center p-5 rounded-xl">
              <div class="icon w-8 h-8 bg-yellow-200 flex items-center justify-center rounded-full mb-2">
                <Icon
                  icon="category"
                  :size="16"
                  color="gray"
                  :alpha="800"
                  variant="outline"
                  class="w-5 h-5"
                />
              </div>
              <div class="info">
                <span class="font-semibold text-sm block text-center">2020</span>
                <span class="text-gray-400 text-xs block text-center">Model Year</span>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="bg-orange-50 flex flex-col items-center justify-center p-5 rounded-xl">
              <div class="icon w-8 h-8 bg-orange-200 flex items-center justify-center rounded-full mb-2">
                <Icon
                  icon="user-tag"
                  :size="16"
                  color="gray"
                  :alpha="800"
                  variant="outline"
                  class="w-5 h-5"
                />
              </div>
              <div class="info">
                <span class="font-semibold text-sm block text-center">2020</span>
                <span class="text-gray-400 text-xs block text-center">Model Year</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template>
  <div>
    <TableTest :headers="headers" :groupedHeaders="groupedHeaders" :data="tableData" />
  </div>
</template>
    <div class="row mb-5 items-center">
      <h4 class="font-semibold mb-2 dark:text-white">
        Badges
      </h4>
      <div class="col-auto my-5">
        <Badge title="Completed" class="bg-green-100 text-green-700" :size="SizeTypeEnum.LG" />
      </div>
      <div class="col-auto my-5">
        <Badge title="In Progress" class="bg-orange-100 text-orange-700" />
      </div>
      <div class="col-auto my-5">
        <Badge title="Incompleted" class="bg-red-100 text-red-700" />
      </div>
      <div class="col-auto my-5">
        <Badge title="Not Started" class="bg-gray-100 text-gray-400" :size="SizeTypeEnum.SM" />
      </div>
    </div>
    <div class="row">
      <h4 class="font-semibold mb-2 dark:text-white">
        Cards
      </h4>
      <div class="col-6 my-5">
        <div class="tests card flex flex-col bg-white shadow-2xl shadow-gray-200 rounded-xl dark:bg-[#21293B] dark:shadow-none">
          <div class="card-header border-b-gray-200 border-b px-5 py-4 dark:border-grey-dark-800">
            <h5 class="font-semibold dark:text-white">
              Typo
            </h5>
          </div>
          <div class="card-body px-5 py-4 typos">
            <h1 class="font-semibold dark:text-white">
              Lorem Ipsum
            </h1>
            <b class="font-medium text-sm text-gray mb-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</b>
            <h2 class="font-semibold dark:text-white">
              Lorem Ipsum
            </h2>
            <b class="font-medium text-sm text-gray mb-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</b>
            <h3 class="font-semibold dark:text-white">
              Lorem Ipsum
            </h3>
            <b class="font-medium text-xs text-gray mb-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</b>
            <h4 class="font-semibold dark:text-white">
              Lorem Ipsum
            </h4>
            <b class="font-normal text-xs text-gray-400 mb-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</b>
            <h5 class="font-semibold dark:text-white">
              Lorem Ipsum
            </h5>
            <b class="font-normal text-xs text-gray mb-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</b>
          </div>
        </div>
      </div>
      <div class="col-6 my-5">
        <div class="tests card flex flex-col bg-white border border-gray-200 rounded-xl dark:bg-[#21293B] dark:shadow-none dark:border-grey-dark-800">
          <div class="card-header border-b-gray-200 border-b px-5 py-4 dark:border-grey-dark-800">
            <h5 class="font-semibold dark:text-white">
              Colors
            </h5>
          </div>
          <div class="card-body px-5 py-4 colors flex flex-wrap justify-around">
            <span class="bg-white w-12 h-12" />
            <span class="bg-gray-400 w-12 h-12" />
            <span class="bg-gray-800 w-12 h-12" />
            <span class="bg-gray-900 w-12 h-12" />
            <span class="bg-blue-900 w-12 h-12" />
            <span class="bg-indigo-900 w-12 h-12" />
            <span class="bg-red-900 w-12 h-12" />
            <span class="bg-green-900 w-12 h-12" />
            <span class="bg-orange-900 w-12 h-12" />
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-5 mx-0">
      <h4 class="font-semibold mb-2 dark:text-white">
        Inputs
      </h4>
      <div class="col-12 bg-white shadow-2xl shadow-gray-200 rounded-xl p-5 dark:bg-[#21293B] dark:shadow-none">
        <Form fclass="row">
          <div class="col-6 mb-6">
            <Input
              v-model="firstName"
              name="firstName"
              type="text"
              label="First Name"
              rules="required"
              :debounce-timer="500"
              hint="Test"
            />
            {{ firstName }}
          </div>
          <div class="col-6 mb-6">
            <Input v-model="lastName" name="lastName" type="text" label="Last Name" rules="required" />
          </div>
          <div class="col-6 mb-6">
            <m-select
              v-model="choice"
              :options="choices"
              name="choice"
              :bind-text="true"
              label="Choice"
              placeholder="Please select"
            />
          </div>
          <div v-if="choice === 'Yes'" class="col-6 mb-6">
            <Input
              v-model="lastName"
              :text-area="true"
              name="message"
              type="text"
              label="Message"
              rules="required"
            />
          </div>
          <div class="col-6 mb-6">
            <Input
              id="td"
              v-model="birthDay"
              name="pickupTime"
              type="datetime-local"
              label="Pickup Date"
              rules=""
            />
            {{ birthDay }}
          </div>
          <div class="col-6 mb-6">
            <Input name="email" type="email" label="E-mail Address" rules="required|email" />
          </div>
          <div class="col-6 mb-6">
            <Input name="email" type="email" label="E-mail Address" rules="required|email" />
          </div>
          <div class="col-6 mb-6">
            <m-select
              v-model="multiSelectedState"
              :multiple="false"
              :searchable="true"
              :options="testOptions"
              name="state"
              label="State"
              :addable="true"
              placeholder="Please select"
            >
              <template #w9>
                <check-box v-model="w9" class="pl-2" :value="w9">
                  W9
                </check-box>
                <FileInput v-if="w9" class="pl-2" :mini="true" />
              </template>
              <template #w2>
                <check-box v-model="w2" class="pl-2" :value="w2">
                  W2
                </check-box>
                <FileInput v-if="w2" class="pl-2" :mini="true" />
              </template>
            </m-select>
          </div>
          <div class="col-6 mb-6">
            <Input name="companyName" type="text" label="Company Name" rules="required" />
          </div>
          <StateSelects :city.sync="cityStates.city" :state.sync="cityStates.state" />
          <div class="col-6 mb-6">
            <Input name="disabled" type="text" label="Company Name (disabled)" :disabled="true" />
          </div>
          <div class="col-6 mb-6">
            <SelectInput
              v-model="companyName"
              :select.sync="companyState"
              :options="companyStates"
              name="company"
              :addable="true"
              type="text"
              label="Company Name"
              rules="required"
              :phone-input="true"
            />
          </div>
          <div class="col-6 mb-6">
            <FileInput label="Company Logo" name="logo" hint="Please upload documentations" :show-progress="true" />
          </div>
          <div class="col-6 mb-6">
            <FileInput label="Company Logo" name="logo" hint="Please upload documentations" :mini="true" />
          </div>
          <div class="col-12 mb-6">
            <check-box v-model="checkBoxTest" :value="checkBoxTest">
              I agree to receive communication from <strong>Nebula</strong>
            </check-box>
          </div>
        </Form>
      </div>
      <div class="relative col-12 my-10 bg-white shadow-2xl shadow-gray-200 rounded-xl p-5 dark:bg-[#21293B] dark:shadow-none">
        <div class="row mb-2">
          <div class="col-3">
            <Button :type="ButtonTypeEnum.LINK" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.BUTTON">
              Cancel
            </Button>
          </div>
          <div class="col-3">
            <Button :type="ButtonTypeEnum.LINK" :size="SizeTypeEnum.MD" :action="ActionTypeEnum.BUTTON">
              Cancel
            </Button>
          </div>
          <div class="col-3">
            <Button :type="ButtonTypeEnum.LINK" :size="SizeTypeEnum.SM" :action="ActionTypeEnum.BUTTON">
              Cancel
            </Button>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-3">
            <Button :type="ButtonTypeEnum.PRIMARY" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.BUTTON">
              Request for demo
              <Icon
                slot="icon"
                icon="arrow-right-2"
                color="white"
                variant="outline"
                :alpha="0"
                class="w-5 h-5 ml-3"
              />
            </Button>
          </div>
          <div class="col-3">
            <Button :type="ButtonTypeEnum.SECONDARY" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.BUTTON">
              Secondary Button
              <Icon
                slot="icon"
                icon="arrow-right-2"
                color="dark"
                variant="outline"
                :alpha="800"
                class="w-5 h-5 ml-3"
              />
            </Button>
          </div>
          <div class="col-3">
            <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.BUTTON">
              Sign Up
            </Button>
          </div>
          <div class="col-3">
            <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.LG" disabled :action="ActionTypeEnum.BUTTON">
              Verify Code
            </Button>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-3">
            <Button :type="ButtonTypeEnum.PRIMARY" :size="SizeTypeEnum.MD" :action="ActionTypeEnum.BUTTON">
              Request for demo
            </Button>
          </div>
          <div class="col-3">
            <Button :type="ButtonTypeEnum.SECONDARY" :size="SizeTypeEnum.MD" :action="ActionTypeEnum.BUTTON">
              Secondary Button
            </Button>
          </div>
          <div class="col-3">
            <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.MD" :action="ActionTypeEnum.BUTTON">
              Sign Up
            </Button>
          </div>
          <div class="col-3">
            <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.MD" disabled :action="ActionTypeEnum.BUTTON">
              Verify Code
            </Button>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-3">
            <Button :type="ButtonTypeEnum.PRIMARY" :size="SizeTypeEnum.SM" :action="ActionTypeEnum.BUTTON">
              Request for demo
            </Button>
          </div>
          <div class="col-3">
            <Button :type="ButtonTypeEnum.SECONDARY" :size="SizeTypeEnum.SM" :action="ActionTypeEnum.BUTTON">
              Secondary Button
            </Button>
          </div>
          <div class="col-3">
            <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.SM" :action="ActionTypeEnum.BUTTON">
              Sign Up
            </Button>
          </div>
          <div class="col-3">
            <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.SM" disabled :action="ActionTypeEnum.BUTTON">
              Verify Code
            </Button>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-3">
            <Button :type="ButtonTypeEnum.PRIMARY" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.BUTTON" @click="modalShow()">
              Open Modal
            </Button>
          </div>
          <div class="col-3">
            <Button :type="ButtonTypeEnum.SECONDARY" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.BUTTON" @click="modalShow()">
              Open Modal
            </Button>
          </div>
          <div class="col-3">
            <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.BUTTON" @click="modalShow()">
              Open Modal
            </Button>
          </div>
          <div class="col-3">
            <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.LG" disabled :action="ActionTypeEnum.BUTTON" @click="modalShow()">
              Open Modal
            </Button>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-3">
            <Button :type="ButtonTypeEnum.PRIMARY" :size="SizeTypeEnum.MD" :action="ActionTypeEnum.BUTTON" @click="showSnack = true">
              Show Snack
            </Button>
          </div>
          <div class="col-3">
            <Button :type="ButtonTypeEnum.SECONDARY" :size="SizeTypeEnum.MD" :action="ActionTypeEnum.BUTTON" @click="showSnack = true">
              Show Snack
            </Button>
          </div>
          <div class="col-3">
            <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.MD" :action="ActionTypeEnum.BUTTON" @click="showSnack = true">
              Show Snack
            </Button>
          </div>
          <div class="col-3">
            <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.MD" disabled :action="ActionTypeEnum.BUTTON" @click="showSnack = true">
              Show Snack
            </Button>
          </div>
        </div>
        <SnackBar :message="responseMessage" :type="responseStatus" :show="showSnack" />
      </div>
    </div>

    <Modal ref="modal" size="sm" position="center">
      <div slot="body" class="row flex items-center justify-center py-16">
        <div class="col-12 flex items-center justify-center">
          <div class="bg-green-400/40 rounded-full w-40 h-40 relative">
            <svg
              width="160"
              height="160"
              viewBox="0 0 1024 1024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="rgb(41, 45, 50)" d="M451.392 664.751c-8.533 0-16.64-3.413-22.613-9.387l-120.749-120.747c-12.373-12.373-12.373-32.853 0-45.227s32.853-12.373 45.227 0l98.135 98.133 219.307-219.307c12.373-12.373 32.853-12.373 45.227 0s12.373 32.853 0 45.227l-241.92 241.92c-5.973 5.973-14.080 9.387-22.613 9.387z" stroke="#BAF1DA" />   </svg>
          </div>
        </div>
        <div class="col-8 items-center justify-center my-14">
          <h3 class="font-semibold text-center mb-2">
            Congratulations !
          </h3>
          <p class="text-b-4 font-medium text-gray-400 text-center">
            Odio eu purus imperdiet feugiat. Faucibus semper volutpat sapien, morbi neque pulvinar velit.
            Elementum sollicitudin sed sit pellentesque consectetur in neque nisl convallis.
          </p>
        </div>
        <div class="col-8">
          <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.LG" @click="showModal = false">
            Close Modal
          </Button>
        </div>
      </div>
    </Modal>

    <div class="row my-5 justify-center items-center">
      <div class="pagination col-auto">
        <div class="row justify-between">
          <div
            class="transition-all text-sm w-8 h-8 border-gray-200 mr-2 flex items-center justify-center border rounded-lg cursor-pointer
          hover:bg-gray-800 hover:text-white
          dark:border-grey-dark-800 dark:text-white
          "
          >
            <i class="fa-solid fa-chevron-left" />
          </div>
          <div
            v-for="index in 3"
            :key="index"
            class="transition-all text-sm w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer mr-2
            hover:bg-gray-800 hover:text-white dark:text-grey-dark-100 dark:hover:text-white"
            :class="[{'bg-gray-800 text-white font-semibold ' : index === 1}]"
          >
            {{ index }}
          </div>
          <div
            class="transition-all text-sm w-8 h-8 border-gray-200 flex items-center justify-center border rounded-lg cursor-pointer
          hover:bg-gray-800 hover:text-white
          dark:border-grey-dark-800 dark:text-white"
          >
            <i class="fa-solid fa-chevron-right" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { SelectOption } from '~/components/ts/interfaces'
import { SizeTypeEnum, ActionTypeEnum, ButtonTypeEnum } from '~/components/ts/enums'
import TableTest from '~/components/table-test.vue'
import loads from '~/static/loads'

export default Vue.extend({
  components: {
    TableTest
  },
  data () {
    return {
      headers: ['Name', 'Age', 'Country', 'City'],
      groupedHeaders: [
        { title: 'Personal Info', colspan: 2 },
        { title: 'Location', colspan: 2 }
      ],
      tableData: [
        { Name: 'John', Age: 25, Country: 'USA', City: 'New York' },
        { Name: 'Emma', Age: 30, Country: 'UK', City: 'London' }
      ],
      inputValue: 0,
      selectedOption: null,
      options: [
        { text: 'option1', id: 1 },
        { text: 'option1', id: 2 },
        { text: 'option1', id: 3 }
        // ... diğer seçenekler
      ] as SelectOption[],
      searchQuery: '',
      searchResults: [],
      data: [
        { id: 1, text: 'Result 1' },
        { id: 2, text: 'Result 2' },
        { id: 3, text: 'Result 3' }
        // ... diğer veriler
      ]as SelectOption[],
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      darkMode: false,
      firstName: '',
      lastName: '',
      birthDay: '2023-07-15',
      selectedState: 0,
      multiSelectedState: [],
      choice: '',
      choices: [
        { id: 1, text: 'Yes', selected: false },
        { id: 2, text: 'No', selected: true }
      ] as SelectOption[],
      checkBoxTest: false,
      showModal: false,
      w9: false,
      w2: false,
      responseMessage: 'Your action has completed successfully.',
      responseStatus: 'success',
      showSnack: false,
      companyName: '',
      companyState: '',
      companyStates: [
        { id: 1, text: 'Texas', selected: true },
        { id: 2, text: 'Ohio', selected: false },
        { id: 3, text: 'Buffalo', selected: false }
      ] as SelectOption[],
      selectOptions: [
        { id: 2, text: 'No', selected: true },
        { id: 1, text: 'Yes', selected: false }
      ]as SelectOption[],
      cityStates: {
        city: '',
        state: ''
      },
      testOptions: [
        { id: 1, text: 'a2as', selected: false, slotName: 'w9' },
        { id: 2, text: 'bdas', selected: true },
        { id: 3, text: 'baads', selected: true, slotName: 'w9' },
        { id: 4, text: 'bcasd', selected: true },
        { id: 5, text: 'bdasd', selected: true },
        { id: 6, text: 'b14e', selected: true, slotName: 'w2' },
        { id: 7, text: 'bf55', selected: true },
        { id: 8, text: 'bg765', selected: true },
        { id: 9, text: 'bhzxc', selected: true }
      ] as SelectOption[],
      loads
    }
  },
  watch: {
    cityStates: {
      handler (val) {
        console.log(val)
      },
      deep: true
    },
    searchQuery: function (newVal) {
      // input değeri değiştiğinde, arama işlemini gerçekleştiriyoruz.
      this.performSearch()
    }
  },
  methods: {
    switchMode (): void {
      this.darkMode = !this.darkMode
      window.localStorage.removeItem('mode')
      window.localStorage.setItem('mode', this.darkMode ? 'dark' : '')
      console.log(document.getElementsByTagName('html')[0].classList)
      if (this.darkMode) {
        document.getElementsByTagName('html')[0].classList.add('dark')
      } else {
        document.getElementsByTagName('html')[0].classList.remove('dark')
      }
    },
    modalShow () : void {
      (this.$refs.modal as Vue & { showModal: () => Function }).showModal()
    },
    increaseValue () {
      // Arttırma işlemi
      this.inputValue++
    },
    decreaseValue () {
      // Azaltma işlemi
      if (this.inputValue > 0) {
        this.inputValue--
      }
    },
    performSearch () {
      // Arama işlemini gerçekleştiriyoruz.
      const searchTerm = this.searchQuery.toLowerCase()
      this.searchResults = this.data.filter((item: any) =>
        item.name.toLowerCase().includes(searchTerm)
      )
    }
  }
})
</script>

<style>
.input-wrapper {
  display: flex;
  align-items: center;
}

.input-field {
  width: 50px;
  text-align: center;
}

.decrease-button,
.increase-button {
  width: 20px;
  height: 20px;
  font-size: 14px;
  cursor: pointer;
}
</style>
