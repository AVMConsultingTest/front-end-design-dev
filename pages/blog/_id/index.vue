<template>
  <div>
    <header class="bg-landing">
      <LandingHeader />
    </header>
    <div class="max-w-[1440px] mx-auto">
      <section class="mt-[7.5rem]">
        <div class="flex justify-center items-start flex-col col-10 my-0 mx-auto">
          <h4 class="border rounded-2xl items-center px-2 bg-[#F2F4F7] font-medium text-b-4 mb-5 leading-5 text-center text-[#667085]">
            {{ findTheBlog('readTime') }}
          </h4>
          <h2 class="font-semibold text-[48px] text-[#101828]">
            {{ findTheBlog('headTitle') }}
          </h2>
          <h5 class="font-normal mt-2 text-b-2 text-[#667085] mb-16">
            {{ findTheBlog('headDesc') }}
          </h5>
          <div class="contents">
            <img :src="findTheBlog('headImg')" alt="blog-detail" class="object-contain w-full">
          </div>
          <div class="col-12 flex mt-8 justify-between">
            <div class="flex">
              <div class="flex flex-col mr-16">
                <span class="text-[#98A2B3] text-b-4 mb-3 font-semibold">{{ findTheBlog('operationManagerTitle') }}</span>
                <span class="text-[18px] font-medium text-dark">{{ findTheBlog('operationManager') }}</span>
              </div>
              <div class="flex flex-col ml-3">
                <span class="text-[#98A2B3] text-b-4 mb-3 font-semibold">
                  {{ findTheBlog('dateTitle') }}
                </span>
                <span class="text-[18px] font-medium text-dark">
                  {{ findTheBlog('date') }}
                </span>
              </div>
            </div>
            <div class="flex">
              <div class="mr-3">
                <Button
                  :type="ButtonTypeEnum.SECONDARY"
                  :size="SizeTypeEnum.MD"
                  :action="ActionTypeEnum.SUBMIT"
                  class="border-[#D0D5DD] !text-[#667085] !w-[124px] !h-10"
                >
                  Copy link
                  <Icon
                    icon="copy"
                    variant="outline"
                    color="gray"
                    :alpha="0"
                    class="w-5 h-5 cursor-pointer ml-2"
                    :disable-fill="true"
                  />
                </button>
              </div>
              <div v-for="(icon, index) in icons" :key="index" class="">
                <div
                  class="flex flex-col items-center"
                  :class="index === icons.length - 1 ? 'mr-12' : 'mr-3'"
                >
                  <div class="p-3 rounded-lg border">
                    <Icon
                      :icon="icon"
                      :disable-fill="true"
                      color="gray"
                      :alpha="0"
                      variant="outline"
                      class="w-4 h-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-10 mt-[120px] mx-auto m-0">
            <p class="text-b-2 font-normal text-[#344054]">
              Adapting to the AI-powered landscape doesn't have to be a challenging journey. At Nebula GTS, we're committed to helping our users navigate this new terrain. Our intuitive interface and comprehensive support ensure that even those new to AI can leverage its benefits.
            </p>
            <hr class="mt-8 border[1px] border-[#EAECF0]">
            <h2 class="mt-14 text-b-0 font-bold">
              Steering Towards Innovation
            </h2>
            <p class="text-c-0 font-normal mt-5 text-[#344054]">
              How Nebula GTS Harnesses AI to Revolutionize Transportation Management System

              In the grand tapestry of technological innovation, Artificial Intelligence (AI) shines as a beacon of transformative potential. Its influence ripples across a wide range of sectors, not the least of which is the transportation industry. As a pioneering force in this field, Nebula GTS has seamlessly integrated AI into our Transportation Management Service (TMS), unlocking a new era of efficiency and data-driven decision-making.
            </p>
            <p class="text-c-0 font-normal mt-5 text-[#344054]">
              <b>AI in Transportation Management:</b> A New Road Map

              AI has the power to streamline and automate many aspects of transportation management. It can analyze large volumes of data, generate predictive insights, optimize route planning, and much more. Nebula GTS leverages these capabilities to offer a TMS platform that's not just reactive, but proactively enhances operational efficiency.
            </p>
            <div class="mt-8 px-[120px]">
              <img src="/images/details-banner.png">
              <p class="mt-4">
                Image courtesy of Scott Webb via <b>Pexels</b>
              </p>
            </div>

            <p class="italic font-medium text-2xl leading-9 text-gray-900 mt-12">
              “In a world older and more complete than ours
              they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear.”
            </p>
            <div class="mt-6 text-center flex justify-center items-center flex-col">
              <img src="/images/avatar-women.png">
              <P class="mt-0.5 font-bold">
                Olivia Rhye
              </P>
              <p class="mt-0.5">
                Product Designer
              </p>
            </div>

            <p class="text-c-0 font-normal mt-5 text-[#344054]">
              At Nebula GTS, our AI-powered TMS enables real-time tracking, smart route optimization, and predictive analytics. By processing vast amounts of data swiftly, our system allows businesses to manage their logistics more efficiently, leading to significant time and cost savings.

              Human Expertise Meets AI: The Best of Both Worlds
            </p>
            <p class="text-c-0 font-normal mt-5 text-[#344054]">
              While AI offers remarkable capabilities, it doesn't replace the need for human expertise. Instead, it enhances it. Our system provides the data and insights, but human decision-makers use their experience and judgment to make the final call. By automating routine tasks, AI frees up professionals to focus on strategic decision-making and problem-solving.

              Navigating the AI-Driven Landscape with Nebula GTS
            </p>
            <h2 class="mt-14 text-b-0 font-bold">
              Software and tools
            </h2>
            <p class="text-c-0 font-normal mt-5 text-[#344054]">
              Adapting to the AI-powered landscape doesn't have to be a challenging journey. At Nebula GTS, we're committed to helping our users navigate this new terrain. Our intuitive interface and comprehensive support ensure that even those new to AI can leverage its benefits.

              Conclusion
            </p>
            <p class="text-c-0 font-normal mt-5 text-[#344054]">
              The integration of AI into transportation management marks a significant leap forward for the industry. As we journey into this exciting new era, Nebula GTS is proud to lead the way, using AI to drive efficiency and innovation. By combining cutting-edge technology with human expertise, we're paving the way for a future where smarter, more effective transportation management is a reality for businesses everywhere.
            </p>
            <h2 class="mt-14 text-b-0 font-bold">
              Shaping the Future of Logistics
            </h2>
            <p class="text-c-0 font-normal mt-5 text-[#344054]">
              Nebula GTS’s AI-Driven Approach to Transportation Management, The advent of Artificial Intelligence (AI) has unveiled a new horizon of possibilities across industries, including the sphere of transportation and logistics. Pioneering this evolution, Nebula GTS has harnessed the power of AI, integrating it into our state-of-the-art Transportation Management Service (TMS) to usher in an era of heightened efficiency, precision, and data-informed decision-making.
            </p>
            <ol class="text-c-0 font-normal mt-5 text-[#344054]">
              <li>1.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>2.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>3.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            </ol>
            <div class="mt-8 px-[120px]">
              <img src="/images/shoes.png">
              <p class="mt-4">
                Image courtesy of Leon via  <b>Unsplash</b>
              </p>
            </div>
            <p class="text-c-0 font-normal mt-5 text-[#344054]">
              Case Study

              AI in Action at Nebula GTS

              To illustrate the power of AI in transportation management, let's consider a use case from one of our clients, a leading eCommerce business. Faced with the challenge of managing a sprawling logistics network, they turned to Nebula GTS's AI-powered TMS.

              Our system analyzed their shipping data, identifying patterns and bottlenecks, and recommended optimized routes that significantly reduced transit times. Furthermore, predictive analytics enabled them to anticipate and mitigate potential disruptions, improving their delivery reliability and customer satisfaction.
            </p>
            <p class="text-c-0 font-normal mt-5 text-[#344054]">
              Human Ingenuity and AI

              A Synergistic Relationship

              While AI serves as a robust tool for optimization and prediction, it doesn't negate the necessity for human expertise. Rather, it complements and enhances it. At Nebula GTS, we view AI as a tool that empowers decision-makers, liberating them from routine tasks and equipping them with valuable insights to make strategic decisions.
            </p>
            <div class="bg-[#F3F1F9] p-5 mt-14 rounded-lg">
              <h2 class="text-b-0 font-bold">
                Software and tools
              </h2>
              <p class="text-c-0 font-normal mt-5 text-[#344054]">
                Preparing for the Future with Nebula GTS

                Adapting to the AI-centric paradigm is not an insurmountable task. With Nebula GTS, users can smoothly transition into this new era. Our platform is designed to be user-friendly, while our dedicated support team is always ready to assist with any queries, ensuring our clients can fully leverage the benefits of AI in their operations.
              </p>
              <p class="text-c-0 font-normal mt-5 text-[#344054]">
                Conclusion

                The fusion of AI and transportation management signifies a quantum leap forward for the logistics industry. As we navigate this exciting terrain, Nebula GTS is proud to be at the forefront, driving innovation and enhancing efficiencies through AI. We're not just responding to the future; we're actively shaping it, creating a smarter, more effective approach to transportation management that benefits businesses worldwide.

                Call to Action

                Are you ready to take your logistics management to the next level? Discover how Nebula GTS can revolutionize your operations. Contact us today to schedule a demo or to learn more about our services.
              </p>
            </div>
            <div class="flex mt-[72px] mb-24 justify-end border-t border-[#EAECF0]">
              <div class="mr-3 mt-6">
                <Button
                  :type="ButtonTypeEnum.SECONDARY"
                  :size="SizeTypeEnum.MD"
                  :action="ActionTypeEnum.SUBMIT"
                  class="border-[#D0D5DD] !text-[#667085] !w-[124px] !h-10"
                >
                  Copy link
                  <Icon
                    icon="copy"
                    variant="outline"
                    color="gray"
                    :alpha="0"
                    class="w-5 h-5 cursor-pointer ml-2"
                    :disable-fill="true"
                  />
                </button>
              </div>
              <div v-for="(icon, index) in icons" :key="index" class="">
                <div
                  class="flex flex-col items-center mt-6"
                  :class="index === icons.length - 1 ? 'mr-0' : 'mr-3'"
                >
                  <div class="p-3 rounded-lg border">
                    <Icon
                      :icon="icon"
                      :disable-fill="true"
                      color="gray"
                      :alpha="0"
                      variant="outline"
                      class="w-4 h-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ButtonTypeEnum, SizeTypeEnum, ActionTypeEnum } from '~/components/ts/enums'
export default Vue.extend({
  name: 'LandingBlogDetail',
  components: {},
  layout: 'Landing',
  data () {
    return {
      ButtonTypeEnum,
      SizeTypeEnum,
      ActionTypeEnum,
      blogs: [
        {
          id: 1,
          image: '/images/blog_Truck.png',
          tag: 'Design',
          readTime: '8 min read',
          headImg: '/images/blog_detail.png',
          headTitle: 'Place blog’s title here',
          operationManagerTitle: 'Operation Manager',
          operationManager: 'Wade Warren',
          dateTitle: 'Date',
          headDesc: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
          title: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar.png',
          writer: 'Olivia Rhye',
          date: '16 May 2023',
          big: true
        },
        {
          id: 2,
          image: '/images/blog_boat.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: false
        },
        {
          id: 3,
          image: '/images/truck_convoy.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: false
        },
        {
          id: 4,
          image: '/images/blog_load.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: false
        },
        {
          id: 5,
          image: '/images/blog_shipyard.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: false
        },
        {
          id: 6,
          image: '/images/blog_boat_load.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: false
        },
        {
          id: 7,
          image: '/images/blog_load_shipyard.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: false
        },
        {
          id: 8,
          image: '/images/blog_boat_2.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: false
        },
        {
          id: 9,
          image: '/images/blog_study.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: false
        }
      ],
      icons: [
        'twitter',
        'facebook',
        'linkedin'
      ]
    }
  },
  methods: {
    findTheBlog (key:string): any {
      return this.blogs[this.$route.params.id - 1][key]
    }
  }
})
</script>

<style scoped>

</style>
