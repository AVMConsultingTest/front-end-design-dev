<template>
  <div>
    <header class="bg-landing relative">
      <LandingHeader />
    </header>
    <LandingBanner
      tag="About Us"
      title="We’d love to hear from you"
      sub-title="We have offices and teams all around the world."
      :big="true"
      class="xl:mb-20 lg:mb-20 mb-0"
    >
      <div class="lg:px-28 xl:px-28 px-2 max-w-[1440px] mx-auto ">
        <div class="rounded-lg xl:bg-white bg-transparent lg:bg-white xl:px-24 lg:px-24 px-4 py-8 xl:shadow-2xl lg:shadow-2xl shadow-none xl:shadow-[#BDBDBD]/30 lg:shadow-[#BDBDBD]/30 dark:shadow-none">
          <img src="/images/map_wrap.png" class="w-full object-contain h-auto">
          <div class="mt-16 mb-24 block xl:flex lg:flex items-center justify-between">
            <div v-for="(contact, index) in contacts" :key="index" class="flex flex-col items-center">
              <span class="text-center text-b-2 font-semibold text-dark mb-2">{{ contact.name }}</span>
              <span class="text-center text-b-3 font-normal text-[#344054] mb-5">
                {{ contact.message }}
              </span>
              <h5 class="text-center text-b-3 font-semibold text-dark-blue">
                {{ contact.contact }}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </LandingBanner>
    <div class="max-w-[1440px] mx-auto text-center">
      <div class="px-2 xl:px-[21rem] lg:px-[21rem] xl:flex lg:flex block   flex-col items-center">
        <h3 class="text-dark font-semibold leading-[61px] text-center mb-5">
          Beautiful analytics to grow smarter
        </h3>
        <span class="text-b-2 font-normal leading-[30px] text-gray-800 text-center">
          Utilizing beautifully designed, comprehensive analytics to empower businesses, enabling them to grow smarter, make informed decisions, and optimize performance in an ever-evolving market landscape
        </span>
      </div>
      <div class="lg:px-20 lg:mb-24 xl:px-20 xl:mb-24 px-2 mb-4">
        <div class="px-4">
          <div class="xl:flex lg:flex block flex-wrap">
            <div v-for="(desc, index,) in descriptions" :key="index" class="xl:col-4 lg:col-4 col-12 px-8 mt-16">
              <div class="flex flex-col items-center">
                <div class="bg-blue-100 p-4 rounded-full mb-5">
                  <Icon
                    :icon="desc.icon"
                    :disable-fill="index !== 4"
                    color="dark-blue"
                    :alpha="0"
                    variant="outline"
                    class="w-6 h-6"
                  />
                </div>
                <span class="text-c-0 text-dark font-semibold leading-[61px] text-center mb-2">
                  {{ desc.title }}
                </span>
                <h6 class="text-gray-500 font-normal text-center mb-3">
                  {{ desc.text }}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LandingFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LandingBanner from '~/components/landing/LandingBanner.vue'
import { SelectOption } from '~/components/ts/interfaces'
import { SizeTypeEnum, ActionTypeEnum } from '~/components/ts/enums'

interface Contact {
  name: string
  message: string
  contact: string
}

interface Job {
  title: string
  description: string
  time: string
  salary: string
  region: string
  regionImage: string
  city: string
  link: string
}

interface OpenPosition {
  team: string
  description: string
  jobs: Job[]
}

export default Vue.extend({
  name: 'LandingAboutUsPage',
  components: { LandingBanner },
  data () {
    return {
      location: 'Worldwide',
      request: {} as any,
      agreed: false,
      SizeTypeEnum,
      ActionTypeEnum,
      locationOptions: [
        { id: 1, text: 'Worldwide', selected: true, icon: { name: 'location' } },
        { id: 2, text: 'Australia, AU', selected: false, img: '/images/au.png' },
        { id: 3, text: 'United States, US', selected: false, img: '/images/usa.png' }
      ] as SelectOption[],
      contacts: [
        {
          name: 'Support',
          message: 'Our friendly team is here to help.',
          contact: 'info@nebulagroup.us'
        },
        {
          name: 'Sales',
          message: 'Questions or queries? Get in touch.',
          contact: 'info@nebulagroup.us'
        },
        {
          name: 'Phone',
          message: 'Mon-Fri from 8am to 5pm',
          contact: '+1 (630) 618-9438'
        }
      ] as Contact[],
      descriptions: [
        {
          icon: 'message-chat-circle',
          title: 'Driving Efficiency in Freight Management',
          text: 'Propelling freight operations towards peak efficiency through cutting-edge technology and innovative solutions.'
        },
        {
          icon: 'zap',
          title: 'Revolutionizing Freight Through Innovation',
          text: 'Transforming the freight industry landscape through groundbreaking technological innovation.'
        },
        {
          icon: 'chart-breakout-square',
          title: 'Creating Seamless Freight Solutions',
          text: 'Crafting comprehensive and streamlined solutions for frictionless freight management.'
        },
        {
          icon: 'message-smile-circle',
          title: 'Empowering Businesses Through Intelligent Freight Management',
          text: 'Enabling businesses to reach new heights of success by providing intelligent freight management solutions designed for optimal efficiency and maximum reliability.'
        },
        {
          icon: 'command',
          title: 'Setting the Course for Sustainable, Efficient Logistics',
          text: 'Pioneering a future where logistics are sustainable and efficient, using innovative technology to minimize environmental impact while maximizing operational productivity.'
        },
        {
          icon: 'message-heart-circle',
          title: 'Redefining Freight Operations with Tech-Powered Solutions',
          text: 'Revitalizing freight operations with technology-driven solutions, ushering in a new era of efficiency and precision in logistics management.'
        }
      ],
      temp: [] as OpenPosition[],
      openPositions: [
        {
          team: 'Design',
          description: 'Open positions in our design team.',
          jobs: [
            {
              title: 'Product Designer',
              description: 'We’re looking for a mid-level product designer to join our team.',
              time: 'Full-time',
              salary: '80k - 100k',
              region: 'AU',
              regionImage: '/images/au.png',
              city: 'Melbourne',
              link: '#'
            },
            {
              title: 'UX Designer',
              description: 'We’re looking for a mid-level UX designer to join our team.',
              time: 'Full-time',
              salary: '80k - 100k',
              region: 'US',
              regionImage: '/images/usa.png',
              city: 'Washington',
              link: '#'
            }
          ]
        },
        {
          team: 'Software Development',
          description: 'Open positions in our software team.',
          jobs: [
            {
              title: 'Engineering Manager',
              description: 'We’re looking for an experienced engineering manager to join our team.',
              time: 'Full-time',
              salary: '80k - 100k',
              region: 'AU',
              regionImage: '/images/au.png',
              city: 'Melbourne',
              link: '#'
            },
            {
              title: 'Frontend Developer',
              description: 'We’re looking for an experienced frontend developer to join our team.',
              time: 'Full-time',
              salary: '80k - 100k',
              region: 'AU',
              regionImage: '/images/au.png',
              city: 'Melbourne',
              link: '#'
            },
            {
              title: 'Backend Developer',
              description: 'We’re looking for an experienced backend developer to join our team.',
              time: 'Full-time',
              salary: '80k - 100k',
              region: 'US',
              regionImage: '/images/usa.png',
              city: 'Washington',
              link: '#'
            }
          ]
        },
        {
          team: 'Customer Success',
          description: 'Open positions in our CX team.',
          jobs: [
            {
              title: 'Customer Success Manager',
              description: 'We’re looking for a mid-level product designer to join our team.',
              time: 'Full-time',
              salary: '80k - 100k',
              region: 'AU',
              regionImage: '/images/au.png',
              city: 'Melbourne',
              link: '#'
            }
          ]
        }
      ] as OpenPosition[]
    }
  },
  computed: {
    filteredPositions (): OpenPosition[] {
      return this.openPositions.map((job: OpenPosition) => {
        if (this.location === 'Worldwide') { return job }
        const jobs = job.jobs.filter((position: Job) => {
          return this.location.includes(position.region)
        })
        if (jobs.length === 0) {
          return {}
        }
        return { ...job, jobs }
      })
    }
  }
})
</script>

<style scoped>

</style>
