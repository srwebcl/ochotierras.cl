<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Información del Cliente')
                            ->schema([
                                Forms\Components\TextInput::make('customer_name')
                                    ->label('Nombre Cliente')
                                    ->required(),
                                Forms\Components\TextInput::make('customer_email')
                                    ->email()
                                    ->required(),
                                Forms\Components\TextInput::make('customer_phone')
                                    ->tel()
                                    ->required(),
                                Forms\Components\Textarea::make('address_shipping')
                                    ->label('Dirección de Envío')
                                    ->required()
                                    ->columnSpanFull(),
                            ])->columns(2),

                        Forms\Components\Section::make('Detalle de Productos')
                            ->schema([
                                Forms\Components\Repeater::make('items')
                                    ->relationship()
                                    ->schema([
                                        Forms\Components\TextInput::make('product_name')
                                            ->label('Producto')
                                            ->disabled(),
                                        Forms\Components\TextInput::make('quantity')
                                            ->label('Cantidad')
                                            ->disabled(),
                                        Forms\Components\TextInput::make('price')
                                            ->label('Precio Unitario')
                                            ->prefix('$')
                                            ->disabled(),
                                    ])
                                    ->columns(3)
                                    ->addable(false)
                                    ->deletable(false)
                            ])
                    ])->columnSpan(2),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Estado del Pedido')
                            ->schema([
                                Forms\Components\Select::make('status')
                                    ->options([
                                        'PENDING' => 'Pendiente',
                                        'PAID' => 'Pagado',
                                        'SHIPPED' => 'Enviado',
                                        'DELIVERED' => 'Entregado',
                                        'FAILED' => 'Fallido',
                                        'CANCELLED' => 'Cancelado',
                                    ])
                                    ->required(),
                                Forms\Components\TextInput::make('total')
                                    ->prefix('$')
                                    ->numeric()
                                    ->disabled() // Total should be calculated
                                    ->required(),
                                Forms\Components\TextInput::make('site_transaction_id')
                                    ->label('ID Transacción Sitio')
                                    ->disabled(),
                                Forms\Components\TextInput::make('payment_id')
                                    ->label('ID Pasarela (Getnet)')
                                    ->disabled(),
                                Forms\Components\Toggle::make('marketing_opt_in')
                                    ->label('Acepta Marketing')
                                    ->disabled(),
                            ])
                    ])->columnSpan(1),
            ])->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('ID')
                    ->sortable(),
                Tables\Columns\TextColumn::make('customer_name')
                    ->label('Cliente')
                    ->searchable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'PENDING' => 'gray',
                        'PAID' => 'success',
                        'SHIPPED' => 'info',
                        'DELIVERED' => 'success',
                        'FAILED' => 'danger',
                        'CANCELLED' => 'danger',
                    })
                    ->searchable(),
                Tables\Columns\TextColumn::make('total')
                    ->money('CLP')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Fecha')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
