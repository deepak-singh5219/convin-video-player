import React, { useContext } from 'react'
import { Context } from '../context/contextApi'
import LeftNav from './LeftNav';



const History = () => {
    const {historyCards} = useContext(Context);
  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
    <LeftNav/>
    <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black h-full p-8 w-full">
    
	<div className=" flex items-center justify-between pb-6">
		<div>
			<h2 className="text-gray-200 font-semibold">History</h2>
			
		</div>
		</div>
		<div>
			<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table className="min-w-full bg-slate-900 text-white leading-normal">
						<thead>
							<tr>
								<th
									className="px-5 py-3 border-b-2 border-gray-500 bg-gray-900 text-left text-sm font-semibold text-gray-100 uppercase tracking-wider">
									Video Title
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-500 bg-gray-900 text-left text-sm font-semibold text-gray-100 uppercase tracking-wider">
									Url
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-500 bg-gray-900 text-left text-sm font-semibold text-gray-100 uppercase tracking-wider">
									Time 
								</th>
							</tr>
						</thead>
						<tbody>
							{
                                historyCards?.map(historyCard => {
                                    const {card, time, date} = historyCard;
                                    return (
                                        <tr>
								<td className="px-5 py-5 border-b border-gray-200 bg-gray-900 text-sm">
									<div className="flex items-center">
										<div className="flex-shrink-0 w-10 h-10">
											
                                        </div>
											<div className="ml-3">
												<p className="text-gray-100 whitespace-no-wrap">
													{card.title}
												</p>
											</div>
										</div>
								</td>
								<td className="px-5 py-5 border border-gray-200 bg-gray-900 text-sm">
									<p className="text-gray-100 whitespace-no-wrap">{card.redirectLink}</p>
								</td>
								<td className="px-5 py-5 border border-gray-200 bg-gray-900 text-sm">
									<p className="text-gray-100 whitespace-no-wrap">
                                        <span className='m-1'>{date}</span>
										<span className='m-1'>{time}</span>
									</p>
								</td>
							
							</tr>
                                    )
                                })
                            }

						</tbody>
					</table>
					
				</div>
			</div>
		</div>
	</div>
    </div>
  )
}

export default History