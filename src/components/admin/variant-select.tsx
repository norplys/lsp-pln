import * as React from "react"
import type { RateVariant } from "@prisma/client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UserWithVariantAndUsage } from "./user-table"

export function VariantSelect({variants, user} : {variants: RateVariant[], user: UserWithVariantAndUsage}) {
  return (
    <Select>
      <SelectTrigger className="w-[180px] text-white">
        <SelectValue placeholder={`${user.variant.name} VA`} />
      </SelectTrigger>
      <SelectContent className="bg-black text-white">
        <SelectGroup id="variant">
          {
            variants.map((variant) => (
              <SelectItem key={variant.id} value={variant.name}>
                {variant.name} VA
              </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
