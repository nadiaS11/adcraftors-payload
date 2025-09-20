import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header as HeaderProps } from '@/payload-types'

export async function Header() {
  const headerData: HeaderProps = await getCachedGlobal('header', 1)()

  return <HeaderClient data={headerData} />
}
