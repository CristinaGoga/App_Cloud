import React from 'react'
import { accounts, billboard, bitcoin, business, card, certificate, coaching, commDollar, comment, depreciation, distribution, dollar, email, euro, event, expenses, glob, groceries, marketing, money, partnership, recipt, rental, services, trading, trash, travel, trend, user } from '../utils/icons';
import Button from '../Button/button';
import styled from 'styled-components';
import { dateFormat } from '../utils/dateFormat';


function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type

}) {

    const categoryIcon =() =>{
        switch(category){
            case 'direct_sales':
            return euro;

            case 'online_sales':
            return money;

            case 'online_advertising':
            return billboard;

            case 'subscription_fees':
            return commDollar;

            case 'trading_commissions':
                return trading;
            
            case 'intellectual_property_licensing':
                return certificate;

            case 'consulting_services':
                return services;

            case 'partnership_sales':
                return partnership;

            case 'commercial_rental_income':
                return rental;
            
            case 'premium_services_fees':
             return commDollar;

             case 'social_media_sales':
             return partnership;


             case 'distribution_sales':
             return distribution;


             case 'affiliate_commissions':
             return euro;

             case 'equipment_rentals':
             return user;

             case 'international_sales':
             return glob;

             case 'coaching_services':
             return coaching;

             case 'event_participation_fees':
             return event;

             case 'email_marketing_sales':
             return email;

             case 'business_audit_fees':
             return business;

             case 'sponsorship_revenue':
                return bitcoin;

                case 'other':
                    return trend;
            case 'office_rent':
                return business;
            case 'utilities':
                return euro;
            case 'office_supplies':
                return business;
            case 'marketing':
                return marketing;
            case 'billboard':
                return trend;
            case 'travel_expenses':
                return travel;
            case 'employee_salaries':
                return user;
            case 'professional_fees':
                return trend;
            case 'insurance':
                return rental;
            case 'maintenance':
                return rental;
            case 'equipment_purchase':
                return coaching;
            case 'taxes':
                return expenses;
            case 'consulting':
                return card;
            case 'software_services':
                return recipt;
            case 'depreciation':
                return depreciation;
            case 'research_and_development':
                return bitcoin;
            
            default:
                    return trend;
            
                
        }
    }
    const expensecategoryIcon=()=>{
        switch(category){
            case 'rent':
                return business;
            case 'utilities':
                return euro;
            case 'groceries':
                return groceries;
            case 'transportation':
                return euro;
            case 'billboard':
                return trend;
            case 'travel_expenses':
                return travel;
            case 'employee_salaries':
                return user;
            case 'professional_fees':
                return trend;
            case 'insurance':
                return rental;
            case 'maintenance':
                return rental;
            case 'equipment_purchase':
                return coaching;
            case 'taxes':
                return expenses;
            case 'consulting':
                return card;
            case 'software_services':
                return recipt;
            case 'depreciation':
                return depreciation;
            case 'research_and_development':
                return bitcoin;
            case 'other':
                return trend;
            default:
                return trend;
        }

    }
  return (
    <IncomeItemStyled indicator={indicatorColor}>
        <div className="icon">
            {type === 'expense' ? expensecategoryIcon() : categoryIcon()}
        </div>
        <div className="content">
            <h5>{title}</h5>
            <div className='inner-content'>
                <div className='text'>
                    <p>{dollar} {amount}</p>
                    <p>{accounts} {dateFormat(date)}</p>
                    <p>
                        {comment}
                        {description}
                    </p>
                </div>
               <div className='btn-con'>
               <Button className="styled-button" icon={trash} onClick={()=>deleteItem(id)} />

               </div>
            </div>
        </div>
    </IncomeItemStyled>
  )
}
const IncomeItemStyled = styled.div`
    background: #f8f8ff;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;

    .btn-con {
        .styled-button {
            padding: 1rem;
            border-radius: 50%;
            background: var(--primary-color);
            color: #fff;
            transition: background 0.3s ease;

            &:hover {
                background: var(--color-green);
            }

            i {
                color: #fff;
            }
        }
    }

    .icon {
        width: 60px;
        height: 60px;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;

        i {
            font-size: 2rem;
        }
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;

        h5 {
            font-size: 1rem;
            padding-left: 2rem;

            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }

        .inner-content {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .text {
                display: flex;
                align-items: center;
                gap: 1.5rem;

                p {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                }
            }
        }
    }
`;
export default IncomeItem;
