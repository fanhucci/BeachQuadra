
interface CustomTableProps {
    tableContent:Record<string,React.ReactNode>[];
}

export default function CustomTable({tableContent}:CustomTableProps){
    const headContent = Object.keys(tableContent[0]);
    
    return(
        <div className="flex justify-center rounded bg-[#FFB870] m-3">
            <table className=" table-auto w-full text-center m-2">
                <thead className="h-8">
                    <tr>
                    {
                        headContent.map((content,index)=>(
                            <th key={index}>{content}</th>
                        ))
                    }
        
                    </tr>
                </thead>
                <tbody className="">
                    {
                        tableContent.map((row,rowIndex)=>(
                            <tr className="h-8" key={rowIndex}>
                                {
                                    Object.values(row).map((content,index)=>(
                                        <td key={index}>{content}</td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}