<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

defineProps<{
  columns: Array<{
    key: string
    label: string
  }>
  data: Array<any>
}>()
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead v-for="column in columns" :key="column.key">
          {{ column.label }}
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="row in data" :key="row.id">
        <TableCell v-for="column in columns" :key="column.key">
          {{ row[column.key] }}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>