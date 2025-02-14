<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
</script>


<template>
    <section id="about" class="bg-white py-16">
      <div class="container ml-6 px-4 grid md:grid-cols-2 gap-8">
        <article>
          <h3 class="text-2xl font-bold mb-4">About Us</h3>
          <p class="text-gray-600">
            EvConn is one of the computer engineering laboratory in Telkom University. 
            We are focusing on Computer and Data Network, and also Cloud Computing Workshop.
          </p>
        </article>
        <aside>
          <h3 class="text-2xl font-bold mb-4">Programs</h3>
          <div class="flex gap-4">
              <Card>
                <CardHeader>
                  <CardTitle class="text-lg">📔 Study Group</CardTitle>
                  <CardDescription>You have 3 unread messages.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle class="text-lg">🔬 Research Group</CardTitle>
                  <CardDescription>You have 3 unread messages.</CardDescription>
                </CardHeader>
              </Card>
          </div>
        </aside>
      </div>
    </section>
  </template>