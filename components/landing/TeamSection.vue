<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

interface TeamMember {
  id: number
  name: string
  role: string
  image: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Team Member 1',
    role: 'Developer',
    image: '/team/member1.jpg'
  },
  {
    id: 2,
    name: 'Team Member 2',
    role: 'Designer',
    image: '/team/member2.jpg'
  },
  {
    id: 3,
    name: 'Team Member 3',
    role: 'Developer',
    image: '/team/member3.jpg'
  }
]
</script>

<template>
    <section id="team" class="bg-white py-16 flex flex-col justify-center items-center">
        <h3 class="text-2xl font-bold mb-4">Meet Our Team</h3>
          <Carousel
            class="relative w-full max-w-sm"
            :opts="{
              align: 'start',
            }"
          >
            <CarouselContent>
              <CarouselItem v-for="member in teamMembers" :key="member.id" class="md:basis-1/2 lg:basis-1/3">
                <div class="p-1">
                  <Card>
                    <CardContent class="flex aspect-square items-center justify-center p-6">
                      <div class="w-32 h-32 rounded-full overflow-hidden mb-4">
                        <img 
                          :src="member.image" 
                          :alt="member.name"
                          class="w-full h-full object-cover"
                          onerror="this.src='/placeholder-avatar.png'"
                        />
                      </div>
                      <h3 class="text-xl font-semibold">{{ member.name }}</h3>
                      <p class="text-gray-600">{{ member.role }}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
    </section>
</template>