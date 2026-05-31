"use client"

import { useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal, X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMobile } from "@/hooks/use-mobile"

const formSchema = z.object({
  q: z.string().optional(),
  categories: z.string().default("010"),
  sorting: z.string().default("date_added"),
  purity: z.string().default("100"),
})

export default function SearchFilters({
  initialQuery = "",
  initialCategory = "010",
  initialSorting = "date_added",
  initialPurity = "100",
}: {
  initialQuery?: string
  initialCategory?: string
  initialSorting?: string
  initialPurity?: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const isMobile = useMobile()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      q: initialQuery,
      categories: initialCategory,
      sorting: initialSorting,
      purity: initialPurity,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams)

      // Set search parameters
      if (values.q) {
        params.set("q", values.q)
      } else {
        params.delete("q")
      }

      params.set("categories", values.categories)
      params.set("sorting", values.sorting)
      params.set("purity", values.purity)
      params.set("page", "1") // Reset to first page

      router.push(`/?${params.toString()}`)
    })
  }

  const resetSearch = () => {
    form.reset({
      q: "",
      categories: "010",
      sorting: "date_added",
      purity: "100",
    })

    startTransition(() => {
      router.push("/")
    })
  }

  if (isMobile) {
    return (
      <div className="flex gap-2 mb-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 flex gap-2">
            <FormField
              control={form.control}
              name="q"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search wallpapers..." className="pl-9" {...field} />
                      {field.value && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-9 px-2"
                          onClick={() => form.setValue("q", "")}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Clear</span>
                        </Button>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              Search
            </Button>
          </form>
        </Form>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Customize your wallpaper search</SheetDescription>
            </SheetHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="010">Anime</SelectItem>
                          <SelectItem value="100">General</SelectItem>
                          <SelectItem value="001">People</SelectItem>
                          <SelectItem value="111">All Categories</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sorting"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sort By</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sorting" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="date_added">Date Added</SelectItem>
                          <SelectItem value="relevance">Relevance</SelectItem>
                          <SelectItem value="random">Random</SelectItem>
                          <SelectItem value="views">Views</SelectItem>
                          <SelectItem value="favorites">Favorites</SelectItem>
                          <SelectItem value="toplist">Top List</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="purity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content Rating</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select content rating" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="100">SFW Only</SelectItem>
                          <SelectItem value="110">SFW & Sketchy</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <SheetFooter className="pt-4">
                  <Button type="button" variant="outline" onClick={resetSearch}>
                    Reset
                  </Button>
                  <SheetClose asChild>
                    <Button type="submit">Apply Filters</Button>
                  </SheetClose>
                </SheetFooter>
              </form>
            </Form>
          </SheetContent>
        </Sheet>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto_auto] gap-4">
          <FormField
            control={form.control}
            name="q"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search wallpapers..." className="pl-9" {...field} />
                    {field.value && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-9 px-2"
                        onClick={() => form.setValue("q", "")}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Clear</span>
                      </Button>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="010">Anime</SelectItem>
                    <SelectItem value="100">General</SelectItem>
                    <SelectItem value="001">People</SelectItem>
                    <SelectItem value="111">All Categories</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sorting"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="date_added">Date Added</SelectItem>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="random">Random</SelectItem>
                    <SelectItem value="views">Views</SelectItem>
                    <SelectItem value="favorites">Favorites</SelectItem>
                    <SelectItem value="toplist">Top List</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="purity"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Content Rating" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="100">SFW Only</SelectItem>
                    <SelectItem value="110">SFW & Sketchy</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={resetSearch}>
              Reset
            </Button>
            <Button type="submit" disabled={isPending}>
              Search
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
