import Logo from '@/components/Logo'
import { Clipboard } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Markdown from 'react-markdown'

const RuneResponse = () => {
    const markdown = `
Sure! Here's a simple explanation of the difference between mitosis and meiosis:
### Mitosis:
- **Purpose:** Helps the body grow and replace old or damaged cells.
- **Process:** One cell divides to make two identical cells.
- **Result:** Each new cell has the same number of chromosomes as the original cell.
- **Where it happens:** In most body cells (like skin, blood, etc.).

### Meiosis:
- **Purpose:** Produces sex cells (sperm and eggs) for reproduction.
- **Process:** One cell divides twice to make four cells.
- **Result:** Each new cell has half the number of chromosomes as the original cell.
- **Where it happens:** In reproductive organs (like ovaries and testes).

### Key Differences:
- **Number of Divisions:** Mitosis has one division, while meiosis has two.
- **Number of Cells Produced:** Mitosis makes two cells; meiosis makes four.
- **Chromosome Number:** Cells from mitosis have the same number of chromosomes as the original cell; cells from meiosis have half.

Mitosis is like making a photocopy of a page, while meiosis is like mixing two pages to create a new one with bits from both.
    `;

    return (
        <div className=' flex justify-between items-start gap-5 px-5'>
            <div className=' p-3 bg-white rounded-full w-fit'>
                <Image src="/rune.svg" width={33} height={30} alt='rune' />
            </div>
            <div className=' flex-1 p-5 bg-white shadow-md rounded-md rounded-tl-none'>
                <Markdown className="font-inter text-[#111] text-base">{markdown}</Markdown>
            </div>
            <div className=' p-2 cursor-pointer bg-white rounded-full w-fit'>
                <Clipboard size={20} />
            </div>
        </div>
    )
}

export default RuneResponse